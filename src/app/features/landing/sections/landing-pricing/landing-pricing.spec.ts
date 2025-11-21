import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPricing } from './landing-pricing';

describe('LandingPricing', () => {
  let component: LandingPricing;
  let fixture: ComponentFixture<LandingPricing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPricing],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPricing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
