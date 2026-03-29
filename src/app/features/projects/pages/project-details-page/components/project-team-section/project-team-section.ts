import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ProjectMember, ProjectVoter } from '../../../../../../core/project/project';
import { ProjectMemberService } from '../../../../../../core/project/project-member.service';
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
  private readonly memberService = inject(ProjectMemberService);

  readonly projectId = input.required<string>();
  readonly creatorId = input.required<string>();
  readonly currentUser = input<FirebaseUserData | undefined>();

  readonly members = signal<ProjectMember[]>([]);
  readonly voters = signal<ProjectVoter[]>([]);
  readonly loading = signal(false);
  readonly showAssignDropdown = signal(false);
  readonly votersLoading = signal(false);

  readonly isOwner = computed(() => {
    const user = this.currentUser();
    if (!user) return false;
    return user.id === this.creatorId() || user.role === UserRole.Admin;
  });

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.loading.set(true);
    this.memberService
      .getMembers(this.projectId())
      .pipe(first())
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
      .pipe(first())
      .subscribe({
        next: (voters) => {
          this.voters.set(voters);
          this.votersLoading.set(false);
        },
        error: () => this.votersLoading.set(false),
      });
  }

  assignMember(voter: ProjectVoter): void {
    this.memberService
      .addMember(this.projectId(), voter.id)
      .pipe(first())
      .subscribe({
        next: (member) => {
          this.members.update((current) => [...current, member]);
          this.voters.update((current) =>
            current.filter((v) => v.id !== voter.id),
          );
        },
        error: () => {
          // Silently handle — voter list stays unchanged
        },
      });
  }

  removeMember(member: ProjectMember): void {
    this.memberService
      .removeMember(this.projectId(), member.userId)
      .pipe(first())
      .subscribe({
        next: () => {
          this.members.update((current) =>
            current.filter((m) => m.id !== member.id),
          );
        },
        error: () => {
          // Silently handle — member list stays unchanged
        },
      });
  }
}
