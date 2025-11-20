import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListPage } from './projects-list-page';

describe('ProjectsListPage', () => {
  let component: ProjectsListPage;
  let fixture: ComponentFixture<ProjectsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
