import { Component, inject, input, OnDestroy } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { User } from '../../../../../../core/user/user';
import { FirebaseUserData } from '../../../../../../core/user/firebase-user-data';
import { ProfileInformationDialog } from '../profile-information-dialog/profile-information-dialog';
import { ModalService } from '../../../../../../core/modal/modal.service';
import { GravatarModule } from 'ngx-gravatar';

@Component({
  selector: 'app-profile-details',
  imports: [TitleCasePipe, ProfileInformationDialog, GravatarModule],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.css',
})
export class ProfileDetails implements OnDestroy {
  private modal = inject(ModalService);

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
