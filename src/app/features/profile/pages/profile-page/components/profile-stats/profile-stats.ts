import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from '../../../../../../core/user/user';
import { FirebaseUserData } from '../../../../../../core/user/firebase-user-data';

@Component({
  selector: 'app-profile-stats',
  imports: [],
  templateUrl: './profile-stats.html',
  styleUrl: './profile-stats.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileStats {
  data = input.required<User & FirebaseUserData>();
}
