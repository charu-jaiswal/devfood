import { InventoryComponent } from './inventory/inventory.component';
import { ReservationFormComponent } from './reservation-comp/reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-comp/reservation-list/reservation-list.component';
import { Routes } from '@angular/router';
import { AdminGuard } from '../../core/guard/admin.guard';
import { MenuBuilderRoutes } from './builder/builder.routing';
import { MenuFormComponent } from './menu/menu-form/menu-form.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { OutletRouteComponent } from './outlet-route/outlet-route.component';
import { OutletFormComponent } from './outlets/outlet-form/outlet-form.component';
import { OutletListComponent } from './outlets/outlet-list/outlet-list.component';
import { SettingRoutes } from './setting/setting.routing';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CatGroupFormComponent } from './cat-group/cat-group-form/cat-group-form.component';
import { CatGroupListComponent } from './cat-group/cat-group-list/cat-group-list.component';
import { StartHereComponent } from './start-here/start-here.component';

export const OutletRoutes: Routes = [
  {
    path: 'outlets',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OutletListComponent,
      },
      {
        path: 'add/new',
        component: OutletFormComponent,
      },
      {
        path: 'edit/:id',
        component: OutletFormComponent,
      },
    ],
  },
  {
    path: 'dash/:outletid',
    component: OutletRouteComponent,
    children: [
      ...MenuBuilderRoutes,
      ...SettingRoutes,
      {
        path: 'orders',
        loadChildren: '../orders/orders.module#OrdersModule',
      },
      {
        path: 'start-here',
        component: StartHereComponent,
      },
      {
        path: 'menu',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: MenuListComponent,
          },
          {
            path: 'add/new',
            component: MenuFormComponent,
          },
          {
            path: 'edit/:id',
            component: MenuFormComponent,
          },
        ],
      },

      {
        path: 'resrvation',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ReservationListComponent,
          },
          {
            path: 'add/new',
            component: ReservationFormComponent,
          },
          {
            path: 'edit/:id',
            component: ReservationFormComponent,
          },
        ],
      },


      { 
        path:'inventory', component:InventoryComponent
      },
      {
        path: 'cat-group',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: CatGroupListComponent,
          },
          {
            path: 'add/new',
            component: CatGroupFormComponent,
          },
          {
            path: 'edit/:id',
            component: CatGroupFormComponent,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: UserListComponent,
          },
          {
            path: 'add/new',
            component: UserFormComponent,
          },
          {
            path: 'edit/:id',
            component: UserFormComponent,
          },
        ],
      },
      { path: 'reports', loadChildren: '../reports/reports.module#ReportsModule' },
    ],
  },
];
