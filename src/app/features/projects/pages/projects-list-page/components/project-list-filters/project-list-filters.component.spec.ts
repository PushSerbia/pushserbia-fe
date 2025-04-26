import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListFiltersComponent } from './project-list-filters.component';

describe('ProjectListFiltersComponent', () => {
  let component: ProjectListFiltersComponent;
  let fixture: ComponentFixture<ProjectListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
