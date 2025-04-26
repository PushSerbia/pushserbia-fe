import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  blogPosts = [
    {
      id: 1,
      title: 'Kako doprineti open-source projektima kao početnik',
      excerpt: 'Vodič za početnike koji žele da se uključe u open-source zajednicu i doprinesu projektima.',
      date: '15. april 2023.',
      author: 'Marko Petrović',
      imageUrl: 'https://via.placeholder.com/800x400',
      slug: 'kako-doprineti-open-source-projektima'
    },
    {
      id: 2,
      title: 'Pregled najpopularnijih JavaScript framework-a u 2023.',
      excerpt: 'Analiza trenutno najpopularnijih JavaScript framework-a i njihovih prednosti i mana.',
      date: '28. maj 2023.',
      author: 'Ana Jovanović',
      imageUrl: 'https://via.placeholder.com/800x400',
      slug: 'pregled-javascript-frameworka-2023'
    },
    {
      id: 3,
      title: 'Organizacija uspešnog hackathon-a: saveti i trikovi',
      excerpt: 'Naučite kako da organizujete uspešan hackathon događaj koji će inspirisati učesnike i doneti inovativna rešenja.',
      date: '10. jun 2023.',
      author: 'Nikola Đorđević',
      imageUrl: 'https://via.placeholder.com/800x400',
      slug: 'organizacija-uspesnog-hackathona'
    }
  ];
}
