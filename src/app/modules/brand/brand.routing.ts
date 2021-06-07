import { Routes } from '@angular/router';
import { AdminGuard } from '../../core/guard/admin.guard';
import { AdminRedirectGuard } from '../../core/guard/admin-redirect.guard';
import { BrandFormComponent } from './brands/brand-form/brand-form.component';
import { DriverFormComponent } from './driver/driver-form/driver-form.component';
import { DriverListComponent } from './driver/driver-list/driver-list.component';
import { GlobalSettingFormComponent } from './global-setting/global-setting-form/global-setting-form.component';
import { LanguageFormComponent } from './language/language-form/language-form.component';
import { MultiLangSettingFormComponent } from './language/multi-lang-setting/multi-lang-setting.component';
import { MultiLanguageFormComponent } from './language/multi-language-form/multi-language-form.component';
import { MultiAdminLanguageFormComponent } from './admin-language/multi-admin-language-form/multi-admin-language-form.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { PaymentFormComponent } from './payment/payment-form/payment-form.component';
import { BecomeDriverListComponent } from './driver/become-driver/become-driver.component';
import { IntegrationFormComponent } from './integration/integration-form/integration-form.component';
// import { UsersListComponent } from './users/users-list/users-list.component';
import { PushNotificationFormComponent } from './push-notification/push-notification-form/push-notification-form.component';
import { EmployeeListFormComponent } from './employee-list/employee-list-form/employee-list-form.component';
import { OrderSettingFormComponent } from './order-setting/order-setting-form/order-setting-form.component';
import { AdminFormComponent } from './admin/admin-form/admin-form.component';
import { AdminLanguageFormComponent } from './admin-language/admin-language-form/admin-language-form.component';
import { LogicSettingFormComponent } from './logic-setting-form/logic-setting-form.component';
import { LocRequestComponent } from './loc-request/loc-request.component';
import { FilterLangFormComponent } from './filter-lang/filter-lang/filter-lang.component';
import { BillingComponent } from './billing/billing.component';

export const BrandRoutes: Routes = [
  {
    path: 'adminConf',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'setting',
        component: AdminFormComponent,
      }],
  },
  {
    path: 'logic',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'setting',
        component: LogicSettingFormComponent,
      }],
  },
  {
    path: 'brands',
    canActivate: [AdminRedirectGuard],
    children: [
      {
        path: 'setting',
        component: BrandFormComponent,
      }],
  },

  {
    path: 'payment',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'setting',
        component: PaymentFormComponent,
      },
      {
        path: 'edit/:id',
        component: PaymentFormComponent,
      }],
  },
  {
    path: 'language',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'setting',
        component: LanguageFormComponent,
      }],
  },
  {
    path: 'multiLang',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'setting',
        component: MultiLangSettingFormComponent,
      },
      {
        path: 'customer/:id',
        component: MultiLanguageFormComponent,
      },
      {
        path: 'admin/:id',
        component: MultiAdminLanguageFormComponent,
      },
      {
        path: 'filterLang',
        component: FilterLangFormComponent,
      }
      ],
  },
  {
    path: 'adminLang',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'setting',
        component: AdminLanguageFormComponent,
      }],
  },
  {
    path: 'notification',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'list',
        component: NotificationListComponent,
      }],
  },
  {
    path: 'global-setting',
    canActivate: [AdminRedirectGuard],
    children: [
      {
        path: 'setting',
        component: GlobalSettingFormComponent,
      }],
  },

  {
    path: 'push-notification',
    canActivate: [AdminRedirectGuard],
    children: [
      {
        path: 'list',
        component: PushNotificationFormComponent,
      }],
  },
  {
    path: 'pos-order-import',
    canActivate: [AdminRedirectGuard],
    children: [
      {
        path: 'list',
        component: EmployeeListFormComponent,
      }],
  },
  {
    path: 'new-loc',
    canActivate: [AdminRedirectGuard],
    children: [
      {
        path: 'list',
        component: LocRequestComponent,
      }],
  },

  {
    path: 'billing',
    canActivate: [AdminRedirectGuard],
    children: [
      {
        path: 'list',
        component: BillingComponent,
      }],
  },

  {
    path: 'driver',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'list',
        component: DriverListComponent,
      },
      {
        path: 'becomeList',
        component: BecomeDriverListComponent,
      },
      {
        path: 'add/new',
        component: DriverFormComponent,
      },
      {
        path: 'edit/:id',
        component: DriverFormComponent,
      },
      {
        path: 'becomeDriver/:becomeDriverID',
        component: DriverFormComponent,
      }],
  },
  {
    path: 'integration',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'setting',
        component: IntegrationFormComponent,
      },
      {
        path: 'add/new',
        component: IntegrationFormComponent,
      },
      {
        path: 'edit/:id',
        component: IntegrationFormComponent,
      }],
  },
  // {
  //   path: 'users',
  //   canActivate: [AdminGuard],
  //   children: [
  //     {
  //       path: 'list',
  //       component: UsersListComponent,
  //     }],
  // },
];
