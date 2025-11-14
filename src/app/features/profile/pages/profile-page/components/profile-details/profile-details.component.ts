import { Component, inject, input, OnDestroy } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { User } from '../../../../../../core/user/user';
import { FirebaseUserData } from '../../../../../../core/user/firebase-user-data';
import { ProfileInformationDialogComponent } from '../profile-information-dialog/profile-information-dialog.component';
import { ModalService } from '../../../../../../core/modal/modal.service';

@Component({
  selector: 'app-profile-details',
  imports: [TitleCasePipe, ProfileInformationDialogComponent],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css',
})
export class ProfileDetailsComponent implements OnDestroy {
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
