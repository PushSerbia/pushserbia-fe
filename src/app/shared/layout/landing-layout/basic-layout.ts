import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { OnboardingChecklist } from '../../ui/onboarding-checklist/onboarding-checklist';

@Component({
  selector: 'app-basic-layout',
  imports: [Header, Footer, OnboardingChecklist],
  templateUrl: './basic-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLayout {}
