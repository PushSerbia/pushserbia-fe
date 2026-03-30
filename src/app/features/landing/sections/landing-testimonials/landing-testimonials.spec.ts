import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTestimonials } from './landing-testimonials';

describe('LandingTestimonials', () => {
  let component: LandingTestimonials;
  let fixture: ComponentFixture<LandingTestimonials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingTestimonials],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingTestimonials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have testimonials array with three items', () => {
    expect(component.testimonials).toBeDefined();
    expect(component.testimonials.length).toBe(3);
  });

  it('should have testimonial with correct properties', () => {
    const firstTestimonial = component.testimonials[0];
    expect(firstTestimonial.quote).toBeDefined();
    expect(firstTestimonial.name).toBe('Dušan');
    expect(firstTestimonial.role).toBe('Software Engineer');
    expect(firstTestimonial.initial).toBe('D');
  });

  it('should include all expected testimonials', () => {
    const names = component.testimonials.map((t) => t.name);
    expect(names).toContain('Dušan');
    expect(names).toContain('LinkedIn korisnik');
    expect(names).toContain('Claude');
  });
});
