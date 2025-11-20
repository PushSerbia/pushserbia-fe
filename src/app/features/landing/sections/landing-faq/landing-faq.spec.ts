import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFaq } from './landing-faq';

describe('LandingFaq', () => {
  let component: LandingFaq;
  let fixture: ComponentFixture<LandingFaq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingFaq],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingFaq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
