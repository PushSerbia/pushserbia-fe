import { Injectable } from '@angular/core';
import { ApiClient } from '../api/api-client';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectApi extends ApiClient<Project> {
  readonly endpoint = 'projects';
}
