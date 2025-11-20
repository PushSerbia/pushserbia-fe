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
  templateUrl: './landing-hero.html',
  styleUrl: './landing-hero.css',
})
export class LandingHero {
  members: Member[] = [
    {
      name: 'Miloš Krstić',
      initials: 'MK',
      imageUrl: '/images/users/milos-krstic.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/mustackio',
    },
    {
      name: 'Marko Makarić',
      initials: 'MM',
      imageUrl: '/images/users/marko-makaric.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/marko-makari%C4%87-547a91ba/',
    },
    {
      name: 'Dušan Perišić',
      initials: 'DP',
      imageUrl: '/images/users/dusan-perisic.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/dusanperisic',
    },
  ];
}
