import { Component, input } from '@angular/core';
import { User } from '../../../../../../core/user/user';
import { FirebaseUserData } from '../../../../../../core/user/firebase-user-data';

@Component({
  selector: 'app-profile-stats',
  imports: [],
  templateUrl: './profile-stats.component.html',
  styleUrl: './profile-stats.component.css'
})
export class ProfileStatsComponent {
  data = input.required<User & FirebaseUserData>();
}
