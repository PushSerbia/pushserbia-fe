import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListPageComponent } from './projects-list-page.component';

describe('ProjectsListPageComponent', () => {
  let component: ProjectsListPageComponent;
  let fixture: ComponentFixture<ProjectsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
