import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectsListPageComponent } from './admin-projects-list-page.component';

describe('AdminProjectsListPageComponent', () => {
  let component: AdminProjectsListPageComponent;
  let fixture: ComponentFixture<AdminProjectsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjectsListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProjectsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
