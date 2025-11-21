import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-basic-layout',
  imports: [Header, Footer],
  templateUrl: './basic-layout.html',
  styleUrl: './basic-layout.css',
})
export class BasicLayout {}
