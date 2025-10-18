import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard, GuestGuard } from '../core/auth.guard';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [
  // Public routes
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    data: { title: 'Home' }
  },
  {
    path: 'home',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    data: { title: 'About Us' }
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then(m => m.Services),
    data: { title: 'Our Offerings' }
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
    data: { title: 'Contact Us' }
  },
  // Auth routes
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent),
    canActivate: [GuestGuard],
    data: { title: 'Login' }
  },
  // Admin routes (protected)
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadComponent: () => import('./admin/admin-layout/admin-layout').then(m => m.AdminLayoutComponent),
    children: adminRoutes,
    data: { title: 'Admin Panel' }
  },
  // Wildcard route
  {
    path: '**',
    redirectTo: '/'
  }
];