import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-landing-how-to',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './landing-how-to.html',
  styleUrl: './landing-how-to.css',
})
export class LandingHowTo {}
