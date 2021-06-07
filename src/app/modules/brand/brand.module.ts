import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../core/shared.module';
import { BrandRoutes } from './brand.routing';
import { BrandFormComponent } from './brands/brand-form/brand-form.component';
import { DriverFormComponent } from './driver/driver-form/driver-form.component';
import { DriverListComponent } from './driver/driver-list/driver-list.component';
import { BecomeDriverListComponent } from './driver/become-driver/become-driver.component';
import { GlobalSettingFormComponent } from './global-setting/global-setting-form/global-setting-form.component';
import { LanguageFormComponent } from './language/language-form/language-form.component';
import { MultiLanguageFormComponent } from './language/multi-language-form/multi-language-form.component';
import { MultiLangSettingFormComponent } from './language/multi-lang-setting/multi-lang-setting.component';
import { MultiAdminLanguageFormComponent } from './admin-language/multi-admin-language-form/multi-admin-language-form.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { IntegrationFormComponent } from './integration/integration-form/integration-form.component';
// import { UsersListComponent } from './users/users-list/users-list.component';
import { PushNotificationFormComponent } from './push-notification/push-notification-form/push-notification-form.component';
import { OrderSettingFormComponent } from './order-setting/order-setting-form/order-setting-form.component';
import { LogicSettingFormComponent } from './logic-setting-form/logic-setting-form.component';
import { LocRequestComponent } from './loc-request/loc-request.component';
import { BillingComponent } from './billing/billing.component';
import { FilterLangFormComponent } from './filter-lang/filter-lang/filter-lang.component';
import { EmployeeListFormComponent } from './employee-list/employee-list-form/employee-list-form.component';

import { HttpClientModule } from '@angular/common/http';
import { WaveModule } from '../../shared/wave/wave.module';

import { PapaParseModule } from 'ngx-papaparse';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';

import { Daterangepicker } from 'ng2-daterangepicker';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { PaymentFormComponent } from './payment/payment-form/payment-form.component';
import { AdminFormComponent } from './admin/admin-form/admin-form.component';
import { AdminLanguageFormComponent } from './admin-language/admin-language-form/admin-language-form.component';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
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
    RouterModule.forChild(BrandRoutes),
    AgmCoreModule.forRoot({
      apiKey: environment.mapKey,
      libraries: ['drawing', 'places', 'visualization'],
    }),
    IonRangeSliderModule,
    PapaParseModule,
  ],
  declarations: [
    BrandFormComponent,
    LanguageFormComponent,
    MultiLanguageFormComponent,
    MultiLangSettingFormComponent,
    MultiAdminLanguageFormComponent,
    GlobalSettingFormComponent,
    DriverFormComponent,
    DriverListComponent,
    BecomeDriverListComponent,
    NotificationListComponent,
    IntegrationFormComponent,
    PushNotificationFormComponent,
    OrderSettingFormComponent,
    PaymentFormComponent,
    AdminFormComponent,
    LogicSettingFormComponent,
    AdminLanguageFormComponent,
    LocRequestComponent,
    FilterLangFormComponent,
    BillingComponent,
    EmployeeListFormComponent,
  ],
})
export class BrandModule { }
