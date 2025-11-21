import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListHeader } from './project-list-header';

describe('ProjectListHeader', () => {
  let component: ProjectListHeader;
  let fixture: ComponentFixture<ProjectListHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
