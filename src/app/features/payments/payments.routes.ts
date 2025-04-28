import { Routes } from '@angular/router';

export const paymentsRoutes: Routes = [
  {
    path: 'finansiranje',
    loadComponent: () =>
      import('./pages/financing-details/financing-details.component').then(
        (m) => m.FinancingDetailsComponent
      ),
  },
  {
    path: 'placanje',
    loadComponent: () =>
      import('./pages/payment-page/payment-page.component').then(
        (m) => m.PaymentPageComponent
      ),
  },
];
