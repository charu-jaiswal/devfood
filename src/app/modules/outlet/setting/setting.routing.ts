
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminGuard } from '../../../core/guard/admin.guard';
import { DeliverySetupFormComponent } from './delivery-setup/delivery-setup-form/delivery-setup-form.component';
import { DeliverySetupListComponent } from './delivery-setup/delivery-setup-list/delivery-setup-list.component';
import { TemporaryClosureFormComponent } from './temporary-closure/temporary-closure-form/temporary-closure-form.component';
import { TemporaryClosureListComponent } from './temporary-closure/temporary-closure-list/temporary-closure-list.component';

export const SettingRoutes: Routes = [
  {
    path: 'setting/temporary-closure',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TemporaryClosureListComponent,
      },
      {
        path: 'add/new',
        component: TemporaryClosureFormComponent,
      },
      {
        path: 'edit/:id',
        component: TemporaryClosureFormComponent,
      },
    ],
  },
  {
    path: 'setting/delivery-setup',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DeliverySetupListComponent,
      },
      {
        path: 'add/new',
        component: DeliverySetupFormComponent,
      },
      {
        path: 'edit/:id',
        component: DeliverySetupFormComponent,
      },
    ],
  },
 
  
];
