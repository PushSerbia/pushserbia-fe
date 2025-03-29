import { afterRender, Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { User } from '../../../../../../core/user/user';
import { FirebaseUserData } from '../../../../../../core/user/firebase-user-data';
import { ProfileInformationDialogComponent } from '../profile-information-dialog/profile-information-dialog.component';
import { initFlowbite } from 'flowbite';
import { ProfileProCardComponent } from '../profile-pro-card/profile-pro-card.component';

@Component({
  selector: 'app-profile-details',
  imports: [
    TitleCasePipe,
    ProfileInformationDialogComponent,
    ProfileProCardComponent
  ],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent {
  data = input.required<User & FirebaseUserData>();

  constructor() {
    afterRender(() => {
      initFlowbite();
    })
  }
}
