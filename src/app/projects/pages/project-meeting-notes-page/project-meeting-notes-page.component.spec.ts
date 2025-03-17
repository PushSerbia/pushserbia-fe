import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMeetingNotesPageComponent } from './project-meeting-notes-page.component';

describe('ProjectMeetingNotesPageComponent', () => {
  let component: ProjectMeetingNotesPageComponent;
  let fixture: ComponentFixture<ProjectMeetingNotesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMeetingNotesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMeetingNotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
