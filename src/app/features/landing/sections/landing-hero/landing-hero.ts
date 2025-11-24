import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

interface Member {
  name: string;
  imageUrl: string;
  linkedinUrl: string;
}

@Component({
  selector: 'app-landing-hero',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './landing-hero.html',
  styleUrl: './landing-hero.css',
})
export class LandingHero {
  readonly members: Member[] = [
    {
      name: 'Miloš Krstić',
      imageUrl: '/images/users/milos-krstic.webp',
      linkedinUrl: 'https://www.linkedin.com/in/mustackio',
    },
    {
      name: 'Marko Makarić',
      imageUrl: '/images/users/marko-makaric.webp',
      linkedinUrl: 'https://www.linkedin.com/in/marko-makari%C4%87-547a91ba/',
    },
    {
      name: 'Dušan Perišić',
      imageUrl: '/images/users/dusan-perisic.webp',
      linkedinUrl: 'https://www.linkedin.com/in/dusanperisic',
    },
  ];
}
