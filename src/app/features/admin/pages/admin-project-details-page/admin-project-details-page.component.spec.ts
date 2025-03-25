import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectDetailsPageComponent } from './admin-project-details-page.component';

describe('AdminProjectDetailsPageComponent', () => {
  let component: AdminProjectDetailsPageComponent;
  let fixture: ComponentFixture<AdminProjectDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjectDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProjectDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
