import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService<any>{
  endpoint = 'projects';
}
