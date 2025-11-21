import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListFilters } from './project-list-filters';

describe('ProjectListFilters', () => {
  let component: ProjectListFilters;
  let fixture: ComponentFixture<ProjectListFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
