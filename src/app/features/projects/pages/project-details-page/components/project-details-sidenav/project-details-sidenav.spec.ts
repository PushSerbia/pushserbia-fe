import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsSidenav } from './project-details-sidenav';

describe('ProjectDetailsSidenav', () => {
  let component: ProjectDetailsSidenav;
  let fixture: ComponentFixture<ProjectDetailsSidenav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailsSidenav],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsSidenav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
