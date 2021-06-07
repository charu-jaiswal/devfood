import { Routes } from '@angular/router';
import { AdminGuard } from '../../core/guard/admin.guard';
import { TutorialComponent } from './tutorial/tutorial.component';
import { OutletPaymentComponent } from './outlet-payment/outlet-payment.component';

export const TutorialRoutes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'help',
        component: TutorialComponent,
      },
      {
        path: 'payment',
        component: OutletPaymentComponent,
      },
    ],
  },
];
