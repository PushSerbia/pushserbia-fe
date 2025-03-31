import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFeedbackComponent } from './profile-feedback.component';

describe('ProfileFeedbackComponent', () => {
  let component: ProfileFeedbackComponent;
  let fixture: ComponentFixture<ProfileFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
