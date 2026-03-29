import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectMember, ProjectVoter } from '../../../../../../core/project/project';
import { ProjectMemberApi } from '../../../../../../core/project/project-member-api';
import { FirebaseUserData } from '../../../../../../core/user/firebase-user-data';
import { UserRole } from '../../../../../../core/user/user-role';
import { GravatarModule } from 'ngx-gravatar';
import { first } from 'rxjs';

@Component({
  selector: 'app-project-team-section',
  imports: [GravatarModule],
  templateUrl: './project-team-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTeamSection implements OnInit {
  private readonly memberService = inject(ProjectMemberApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);

  readonly projectId = input.required<string>();
  readonly creatorId = input.required<string>();
  readonly currentUser = input<FirebaseUserData | undefined>();

  readonly members = signal<ProjectMember[]>([]);
  readonly voters = signal<ProjectVoter[]>([]);
  readonly loading = signal(false);
  readonly showAssignDropdown = signal(false);
  readonly votersLoading = signal(false);
  readonly assigningIds = signal<Set<string>>(new Set());
  readonly removingIds = signal<Set<string>>(new Set());

  readonly isOwner = computed(() => {
    const user = this.currentUser();
    if (!user) return false;
    return user.id === this.creatorId() || user.role === UserRole.Admin;
  });

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this.showAssignDropdown() &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.showAssignDropdown.set(false);
    }
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.loading.set(true);
    this.memberService
      .getMembers(this.projectId())
      .pipe(first(), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (members) => {
          this.members.set(members);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  toggleAssignDropdown(): void {
    const isOpen = this.showAssignDropdown();
    if (!isOpen) {
      this.loadVoters();
    }
    this.showAssignDropdown.set(!isOpen);
  }

  loadVoters(): void {
    this.votersLoading.set(true);
    this.memberService
      .getVoters(this.projectId())
      .pipe(first(), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (voters) => {
          this.voters.set(voters);
          this.votersLoading.set(false);
        },
        error: () => this.votersLoading.set(false),
      });
  }

  assignMember(voter: ProjectVoter): void {
    if (this.assigningIds().has(voter.id)) return;

    this.assigningIds.update((ids) => new Set(ids).add(voter.id));

    this.memberService
      .addMember(this.projectId(), voter.id)
      .pipe(first(), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (member) => {
          this.members.update((current) => [...current, member]);
          this.voters.update((current) =>
            current.filter((v) => v.id !== voter.id),
          );
          this.assigningIds.update((ids) => {
            const next = new Set(ids);
            next.delete(voter.id);
            return next;
          });

          if (this.voters().length === 0) {
            this.showAssignDropdown.set(false);
          }
        },
        error: () => {
          this.assigningIds.update((ids) => {
            const next = new Set(ids);
            next.delete(voter.id);
            return next;
          });
        },
      });
  }

  removeMember(member: ProjectMember): void {
    if (this.removingIds().has(member.userId)) return;

    this.removingIds.update((ids) => new Set(ids).add(member.userId));

    this.memberService
      .removeMember(this.projectId(), member.userId)
      .pipe(first(), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.members.update((current) =>
            current.filter((m) => m.id !== member.id),
          );
          this.removingIds.update((ids) => {
            const next = new Set(ids);
            next.delete(member.userId);
            return next;
          });
        },
        error: () => {
          this.removingIds.update((ids) => {
            const next = new Set(ids);
            next.delete(member.userId);
            return next;
          });
        },
      });
  }
}
