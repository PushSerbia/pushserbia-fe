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
  styleUrl: './landing-testimonials.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingTestimonials {
  readonly testimonials: Testimonial[] = [
    {
      quote:
        'Pridružio sam se Push Serbia da unapredim svoje veštine i već posle par meseci, uz pomoć mentora kojeg sam upoznao ovde, dobio sam bolji posao.',
      name: 'Marko J.',
      role: 'JavaScript developer',
      initial: 'M',
    },
    {
      quote:
        'Predložio sam projekat za digitalizaciju školskih udžbenika i zajednica mi je pomogla da ga realizujem. Neverovatan osećaj kada tvoj kod pomaže hiljadama učenika.',
      name: 'Ana S.',
      role: 'Full-stack developer',
      initial: 'A',
    },
    {
      quote:
        'Kao dizajner, nisam znao kako da doprinosim open-source projektima. Push Serbia mi je pokazala put — sada radim na 3 projekta i učim svaki dan.',
      name: 'Nikola T.',
      role: 'UX dizajner',
      initial: 'N',
    },
  ];
}
