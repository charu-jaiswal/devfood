import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guard/admin.guard';
import { AuthResolver } from './core/auth.resolver';
import { AdminRedirectGuard } from './core/guard/admin-redirect.guard';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      {
        path: 'outlet',
        loadChildren: './modules/outlet/outlet.module#OutletModule',
        resolve: { auth: AuthResolver },
      },
      {
        path: 'settings',
        loadChildren: './modules/settings/settings.module#SettingsModule',
        resolve: { auth: AuthResolver },
        canActivate: [AdminGuard],
      },
      {
        path: 'brand',
        loadChildren: './modules/brand/brand.module#BrandModule',
        resolve: { auth: AuthResolver },
      },
      {
        path: 'reports',
        loadChildren: './modules/reports/reports.module#ReportsModule',
        resolve: { auth: AuthResolver },
      },
      {
        path: 'design',
        loadChildren: './modules/design/design.module#DesignModule',
        resolve: { auth: AuthResolver },
      },
      {
        path: 'orders',
        loadChildren: './modules/orders/orders.module#OrdersModule',
        resolve: { auth: AuthResolver },
      },
      {
        path: 'tutorial',
        loadChildren: './modules/tutorials/tutorial.module#TutorialModule',
        resolve: { auth: AuthResolver },
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './authentication/authentication.module#AuthenticationModule',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/auth/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(Approutes, { useHash: false })],
  exports: [RouterModule],
  providers: [AuthResolver, AdminGuard, AdminRedirectGuard],
})
export class AppRoutingModule { }
