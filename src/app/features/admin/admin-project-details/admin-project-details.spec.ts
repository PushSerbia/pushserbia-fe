import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectDetails } from './admin-project-details';

describe('AdminProjectDetails', () => {
  let component: AdminProjectDetails;
  let fixture: ComponentFixture<AdminProjectDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjectDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProjectDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
