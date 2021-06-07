import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../core/shared.module';
import { ReportsRoutes } from './reports.routing';
import { ReportsListComponent } from './reports/reports-list/reports-list.component';
import { RatingComponent } from './reports/rating/rating.component';
import { DriverOrderListComponent } from './reports/driver-order/driver-order.component';
import { CouponWiseComponent } from './coupon-wise/coupon-wise.component';
import { UserWiseComponent } from './user-wise/user-wise.component';
import { RewardListComponent } from './reward/reward.component';
import { RewardTranListComponent } from './reward-tran/reward-tran.component';

import { ReportListService } from './reports/reports-list/reports-list.services';
import { StatsService } from './stats/stats.services';
import { HttpClientModule } from '@angular/common/http';
import { WaveModule } from '../../shared/wave/wave.module';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';

import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { StatsComponent } from './stats/stats.component';
import { OutletWiseSalesComponent } from './outlet-wise-sales/outlet-wise-sales.component';
import { OutletWiseSalesServices } from './outlet-wise-sales/outlet-wise-sales.services';
import { DateWiseSalesComponent } from './date-wise-sales/date-wise-sales.component';
import { DateWiseSalesServices } from './date-wise-sales/date-wise-sales.services';
import { AgmCoreModule } from '@agm/core';
import { Daterangepicker } from 'ng2-daterangepicker';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { UsersListComponent } from './users/users-list/users-list.component';
import { DriverReportComponent } from './driver/driver.component';
import { DriverReportServices } from './driver/driver.services';
import { OrderPopupComponent } from './modal-pop/order-popup/order-popup.component';
import { ViewPopupComponent } from './modal-pop/view-popup/view-popup.component';
import { PaymnetPendingPopupComponent } from './modal-pop/payament-pending-popup/payment-pending-popup.component';
import { UsersListService } from './users/users-list/users-list.services';
import { OutletCommissionComponent } from './outlet-commission/outlet-commission.component';
import { OutletCommissionServices } from './outlet-commission/outlet-commission.services';
import { ItemWiseComponent } from './item-wise/item-wise.component';
import { ItemWiseServices } from './item-wise/item-wise.services';
import { CouponWiseServices } from './coupon-wise/coupon-wise.services';
import { UserWiseServices } from './user-wise/user-wise.services';
import { RewardsListService } from './reward/reward.services';
import { RewardTransListService } from './reward-tran/reward-tran.services';
import { UsersComponent } from './users/customer/users.component';
import { DashboardMainComponent } from './main/main.component';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    AngularMultiSelectModule,
    NgbPaginationModule,
    ColorPickerModule,
    Daterangepicker,
    WaveModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    QuillModule,
    CommonModule,
    SharedModule,
    NgSelectModule,
    NgbModule,
    RouterModule.forChild(ReportsRoutes),
    IonRangeSliderModule,
    ChartsModule,
    ChartistModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapKey,
      libraries: ['drawing', 'places', 'visualization'],
    }),
  ],
  declarations: [
    ReportsListComponent,
    RatingComponent,
    CouponWiseComponent,
    UserWiseComponent,
    StatsComponent,
    OutletWiseSalesComponent,
    DateWiseSalesComponent,
    UsersListComponent,
    DriverReportComponent,
    DriverOrderListComponent,
    OrderPopupComponent,
    ViewPopupComponent,
    PaymnetPendingPopupComponent,
    OutletCommissionComponent,
    ItemWiseComponent,
    UsersComponent,
    DashboardMainComponent,
    RewardListComponent,
    RewardTranListComponent,
  ],
  entryComponents: [
    OrderPopupComponent,
    ViewPopupComponent,
  ],
  providers: [
    OutletWiseSalesServices,
    ReportListService,
    StatsService,
    DateWiseSalesServices,
    DriverReportServices,
    UsersListService,
    OutletCommissionServices,
    ItemWiseServices,
    CouponWiseServices,
    UserWiseServices,
    RewardsListService,
    RewardTransListService,
  ],
})
export class ReportsModule { }
