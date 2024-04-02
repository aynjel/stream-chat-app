import { Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    ...canActivate(() => redirectLoggedInTo(['chat'])),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    ...canActivate(() => redirectLoggedInTo(['chat'])),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/chat/chat.component').then((m) => m.ChatComponent),
    ...canActivate(() => redirectUnauthorizedTo(['login'])),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
