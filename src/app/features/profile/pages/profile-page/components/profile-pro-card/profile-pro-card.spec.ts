import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProCard } from './profile-pro-card';

describe('ProfileProCard', () => {
  let component: ProfileProCard;
  let fixture: ComponentFixture<ProfileProCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileProCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileProCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
