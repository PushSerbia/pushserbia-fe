import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHeroComponent } from './landing-hero.component';

describe('LandingHeroComponent', () => {
  let component: LandingHeroComponent;
  let fixture: ComponentFixture<LandingHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
