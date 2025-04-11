import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsSidenavComponent } from './project-details-sidenav.component';

describe('ProjectDetailsSidenavComponent', () => {
  let component: ProjectDetailsSidenavComponent;
  let fixture: ComponentFixture<ProjectDetailsSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailsSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
