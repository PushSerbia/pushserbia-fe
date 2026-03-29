import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectMember, ProjectVoter } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectMemberApi {
  private httpClient = inject(HttpClient);

  getMembers(projectId: string): Observable<ProjectMember[]> {
    return this.httpClient.get<ProjectMember[]>(
      `/projects/${projectId}/members`,
    );
  }

  getVoters(projectId: string): Observable<ProjectVoter[]> {
    return this.httpClient.get<ProjectVoter[]>(
      `/projects/${projectId}/members/voters`,
    );
  }

  addMember(projectId: string, userId: string): Observable<ProjectMember> {
    return this.httpClient.post<ProjectMember>(
      `/projects/${projectId}/members`,
      { userId },
    );
  }

  removeMember(projectId: string, userId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `/projects/${projectId}/members/${userId}`,
    );
  }
}
