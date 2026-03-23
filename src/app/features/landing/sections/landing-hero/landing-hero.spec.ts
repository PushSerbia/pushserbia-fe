import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LandingHero } from './landing-hero';

describe('LandingHero', () => {
  let component: LandingHero;
  let fixture: ComponentFixture<LandingHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingHero],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
