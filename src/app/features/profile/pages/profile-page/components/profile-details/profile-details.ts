import { ChangeDetectionStrategy, Component, inject, input, OnDestroy } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { User } from '../../../../../../core/user/user';
import { FirebaseUserData } from '../../../../../../core/user/firebase-user-data';
import { ProfileInformationDialog } from '../profile-information-dialog/profile-information-dialog';
import { ModalManager } from '../../../../../../core/modal/modal-manager';
import { GravatarModule } from 'ngx-gravatar';
import { ProfileProCard } from '../profile-pro-card/profile-pro-card';

@Component({
  selector: 'app-profile-details',
  imports: [TitleCasePipe, ProfileInformationDialog, GravatarModule, ProfileProCard],
  templateUrl: './profile-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileDetails implements OnDestroy {
  private modal = inject(ModalManager);

  id = 'profile-information-dialog';
  data = input.required<User & FirebaseUserData>();

  ngOnDestroy(): void {
    this.closeProfileInformationDialog();
    this.modal.remove(this.id);
  }

  openProfileInformationDialog(): void {
    this.modal.open(this.id);
  }

  closeProfileInformationDialog(): void {
    this.modal.close(this.id);
  }
}
