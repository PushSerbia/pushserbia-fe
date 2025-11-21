import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMeetingNotesPage } from './project-meeting-notes-page';

describe('ProjectMeetingNotesPage', () => {
  let component: ProjectMeetingNotesPage;
  let fixture: ComponentFixture<ProjectMeetingNotesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMeetingNotesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectMeetingNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
