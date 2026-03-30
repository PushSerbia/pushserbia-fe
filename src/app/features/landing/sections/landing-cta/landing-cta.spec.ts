import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LandingCta } from './landing-cta';

describe('LandingCta', () => {
  let component: LandingCta;
  let fixture: ComponentFixture<LandingCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingCta],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingCta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
