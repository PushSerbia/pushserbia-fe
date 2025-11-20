import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFeedback } from './profile-feedback';

describe('ProfileFeedback', () => {
  let component: ProfileFeedback;
  let fixture: ComponentFixture<ProfileFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFeedback],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileFeedback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
