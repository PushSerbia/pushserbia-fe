import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/project/project';
import { NgOptimizedImage } from '@angular/common';
import { UnsplashUrlFormatter } from '../../unsplash-url-formatter';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, NgOptimizedImage, UnsplashUrlFormatter],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  project = input.required<Project>();
  supported = input.required<boolean>();
  viewTransitionName = input<string>('');
  priorityImg = input<boolean>(false);
}
