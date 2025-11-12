import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Member {
  name: string;
  initials: string;
  imageUrl: string;
  linkedinUrl: string;
}

@Component({
  selector: 'app-landing-hero',
  imports: [RouterLink],
  templateUrl: './landing-hero.component.html',
  styleUrl: './landing-hero.component.css',
})
export class LandingHeroComponent {
  members: Member[] = [
    {
      name: 'Miloš Krstić',
      initials: 'MK',
      imageUrl: '',
      linkedinUrl: '',
    },
    {
      name: 'Marko Makarić',
      initials: 'MM',
      imageUrl: '',
      linkedinUrl: '',
    },
    {
      name: 'Dušan Perišić',
      initials: 'DP',
      imageUrl: '/images/users/dusan-perisic.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/dusan-perisic-672772202/',
    },
  ];
}
