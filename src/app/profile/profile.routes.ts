import { Route } from "@angular/router";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { NotificationsListPageComponent } from "./pages/notifications-list-page/notifications-list-page.component";

export const profileRoutes: Route[] = [{
  path: '',
  loadComponent: () => ProfilePageComponent
}, {
  path: 'notifications',
  loadComponent: () => NotificationsListPageComponent
}];
