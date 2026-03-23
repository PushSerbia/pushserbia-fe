import { Routes } from '@angular/router';

export const paymentsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'finansiranje',
    pathMatch: 'full',
  },
  {
    path: 'finansiranje',
    loadComponent: () =>
      import('./pages/financing-details/financing-details').then(
        (m) => m.FinancingDetails,
      ),
  },
  {
    path: 'placanje',
    loadComponent: () =>
      import('./pages/payment-page/payment-page').then((m) => m.PaymentPage),
  },
];
