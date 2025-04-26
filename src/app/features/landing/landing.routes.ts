import { Route } from '@angular/router';
import { LandingComponent } from './landing.component';
import { FinancingDetailsComponent } from './pages/financing-details/financing-details.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { LicensingComponent } from './pages/licensing/licensing.component';
import { TermsComponent } from './pages/terms/terms.component';
import { CareersComponent } from './pages/careers/careers.component';
import { BrandCenterComponent } from './pages/brand-center/brand-center.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';

export const landingRoutes: Route[] = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'finansiranje',
    component: FinancingDetailsComponent,
  },
  {
    path: 'placanje',
    component: PaymentPageComponent,
  },
  {
    path: 'o-nama',
    component: AboutComponent,
  },
  {
    path: 'kontakt',
    component: ContactComponent,
  },
  {
    path: 'politika-privatnosti',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'licence',
    component: LicensingComponent,
  },
  {
    path: 'uslovi-koriscenja',
    component: TermsComponent,
  },
  {
    path: 'karijere',
    component: CareersComponent,
  },
  {
    path: 'brend-centar',
    component: BrandCenterComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'blog/:slug',
    component: BlogPostComponent,
  },
];
