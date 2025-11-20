import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStats } from './profile-stats';

describe('ProfileStats', () => {
  let component: ProfileStats;
  let fixture: ComponentFixture<ProfileStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileStats],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
