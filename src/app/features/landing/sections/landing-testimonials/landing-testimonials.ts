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
        'Svaki dan pišem kod za kompanije širom sveta. Ovde pišem kod za komšiluk — i taj osećaj ne možeš da kupiš.',
      name: 'Miloš Krstić',
      role: 'Suosnivač',
      initial: 'M',
    },
    {
      quote:
        'Najbolji deo nije kod, nego ljudi. Za par meseci sam upoznao developere i ljude sa idejama za koje nisam ni znao da postoje kod nas.',
      name: 'Marko Makarić',
      role: 'Suosnivač',
      initial: 'M',
    },
    {
      quote:
        'Krenuli smo od jednog pitanja: šta ako svoje veštine iskoristimo za nešto što stvarno pomaže? Push Serbia je odgovor koji zajednica gradi svakog dana.',
      name: 'Dušan Perišić',
      role: 'Suosnivač',
      initial: 'D',
    },
  ];
}
