import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBenefits } from './landing-benefits';

describe('LandingBenefits', () => {
  let component: LandingBenefits;
  let fixture: ComponentFixture<LandingBenefits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingBenefits],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingBenefits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
