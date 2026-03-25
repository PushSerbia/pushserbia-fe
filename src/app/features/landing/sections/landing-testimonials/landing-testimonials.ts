import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initial: string;
}

@Component({
  selector: 'app-landing-testimonials',
  imports: [],
  templateUrl: './landing-testimonials.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingTestimonials {
  readonly testimonials: Testimonial[] = [
    {
      quote:
        'Misija projekta je zadužbinarstvo, a o tome valjda razmišljamo sa godinama.',
      name: 'Dušan',
      role: 'Software Engineer',
      initial: 'D',
    },
    {
      quote: 'Ovo vam je čisto gubljenje vremena.',
      name: 'LinkedIn korisnik',
      role: '',
      initial: 'L',
    },
    {
      quote: 'Napisao sam im pola koda i još uvek ne mogu da glasam.',
      name: 'Claude',
      role: 'AI Assistant',
      initial: 'C',
    },
  ];
}
