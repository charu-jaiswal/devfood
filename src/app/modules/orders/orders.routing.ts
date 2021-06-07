import { Routes } from '@angular/router';
import { AdminGuard } from '../../core/guard/admin.guard';
import { TableBookingComponent } from './table-booking/table-booking.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentPendingComponent } from './payment-pending/payment-pending.component';

export const OrderRoutes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'table-booking',
        component: TableBookingComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'payment',
        component: PaymentPendingComponent,
      },
    ],
  },
];
