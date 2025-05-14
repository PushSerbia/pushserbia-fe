import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends ApiService<Project> {
  readonly endpoint = 'projects';
}
