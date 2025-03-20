import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHowToComponent } from './landing-how-to.component';

describe('LandingHowToComponent', () => {
  let component: LandingHowToComponent;
  let fixture: ComponentFixture<LandingHowToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingHowToComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingHowToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
