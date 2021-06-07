import { Routes } from '@angular/router';
import { AdminGuard } from '../../core/guard/admin.guard';
import { ReportsListComponent } from './reports/reports-list/reports-list.component';
import { StatsComponent } from './stats/stats.component';
import { OutletWiseSalesComponent } from './outlet-wise-sales/outlet-wise-sales.component';
import { DriverOrderListComponent } from './reports/driver-order/driver-order.component';
import { DateWiseSalesComponent } from './date-wise-sales/date-wise-sales.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { DriverReportComponent } from './driver/driver.component';
import { OutletCommissionComponent } from './outlet-commission/outlet-commission.component';
import { ItemWiseComponent } from './item-wise/item-wise.component';
import { UsersComponent } from './users/customer/users.component';
import { RatingComponent } from './reports/rating/rating.component';
import { CouponWiseComponent } from './coupon-wise/coupon-wise.component';
import { UserWiseComponent } from './user-wise/user-wise.component';
import { DashboardMainComponent } from './main/main.component';
import { RewardListComponent } from './reward/reward.component';
import { RewardTranListComponent } from './reward-tran/reward-tran.component';

export const ReportsRoutes: Routes = [
  
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'main',
        component: DashboardMainComponent,
      },
      {
        path: 'list',
        component: ReportsListComponent,
      },
      {
        path: 'rating',
        component: RatingComponent,
      },
      {
        path: 'order-coupon',
        component: CouponWiseComponent,
      },
      {
        path: 'order-user',
        component: UserWiseComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
      {
        path: 'outlet-wise-sales',
        component: OutletWiseSalesComponent,
      },
      {
        path: 'date-wise-sales',
        component: DateWiseSalesComponent,
      },
      {
        path: 'customer-list',
        component: UsersListComponent,
      },
      {
        path: 'driver',
        component: DriverReportComponent,
      },
      {
        path: 'driver-order',
        component: DriverOrderListComponent,
      },
      {
        path: 'outlet-commission',
        component: OutletCommissionComponent,
      },
      {
        path: 'item',
        component: ItemWiseComponent,
      },
      {
        path: 'reward',
        component: RewardListComponent,
      },
      {
        path: 'reward-tran',
        component: RewardTranListComponent,
      },
      {
        path: 'customer/:id',
        component: UsersComponent,
      },
    ],
  },
];
