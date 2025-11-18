import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectsList } from './admin-projects-list';

describe('AdminProjectsList', () => {
  let component: AdminProjectsList;
  let fixture: ComponentFixture<AdminProjectsList>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjectsList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProjectsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
