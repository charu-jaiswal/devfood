import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../core/shared.module';
import { OrderRoutes } from './orders.routing';

// import { HttpClientModule } from '@angular/common/http';
import { WaveModule } from '../../shared/wave/wave.module';
import { OrderService } from './order.service';

import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { AgmCoreModule } from '@agm/core';
import { Daterangepicker } from 'ng2-daterangepicker';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { TableBookingComponent } from './table-booking/table-booking.component';
import { OrdersComponent } from './orders/orders.component';
import { ViewPopupComponent } from '../reports/modal-pop/view-popup/view-popup.component';
import { ReportsModule } from '../reports/reports.module';
import { PaymentPendingComponent } from './payment-pending/payment-pending.component';
import { PaymnetPendingPopupComponent } from '../reports/modal-pop/payament-pending-popup/payment-pending-popup.component';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    AngularMultiSelectModule,
    NgbPaginationModule,
    ColorPickerModule,
    Daterangepicker,
    WaveModule,
    // HttpClientModule,
    FormsModule,
    QuillModule,
    CommonModule,
    SharedModule,
    NgSelectModule,
    NgbModule,
    RouterModule.forChild(OrderRoutes),
    IonRangeSliderModule,
    ReportsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapKey,
      libraries: ['places'],
    }),
  ],
  declarations: [
    TableBookingComponent,
    OrdersComponent,
    PaymentPendingComponent,
  ],
  providers: [
    OrderService,
  ],
  entryComponents: [
    ViewPopupComponent,
    PaymnetPendingPopupComponent,
  ],
})
export class OrdersModule { }
