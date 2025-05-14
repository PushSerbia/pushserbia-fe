import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardNewComponent } from './project-card-new.component';

describe('ProjectCardNewComponent', () => {
  let component: ProjectCardNewComponent;
  let fixture: ComponentFixture<ProjectCardNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardNewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
