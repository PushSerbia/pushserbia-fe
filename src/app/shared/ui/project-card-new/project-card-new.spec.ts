import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardNew } from './project-card-new';

describe('ProjectCardNew', () => {
  let component: ProjectCardNew;
  let fixture: ComponentFixture<ProjectCardNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardNew],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
