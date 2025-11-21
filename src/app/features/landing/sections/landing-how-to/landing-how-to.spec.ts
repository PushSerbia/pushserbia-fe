import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHowTo } from './landing-how-to';

describe('LandingHowTo', () => {
  let component: LandingHowTo;
  let fixture: ComponentFixture<LandingHowTo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingHowTo],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingHowTo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
