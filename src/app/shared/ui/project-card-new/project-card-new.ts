import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthRequired } from '../../../core/auth/auth-required';

@Component({
  selector: 'app-project-card-new',
  imports: [RouterLink, AuthRequired],
  templateUrl: './project-card-new.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardNew {}
