import { ZoneManagerFormComponent } from './zonemanager/zone-manager-form/zone-manager-form.component';
import { ZoneManagerListComponent } from './zonemanager/zone-manager-list/zone-manager-list.component';
import { SubadminFormComponent } from './subadmin/subadmin-form/subadmin-form.component';
import { SubadminListComponent } from './subadmin/subadmin-list/subadmin-list.component';


import { EcommerceFormComponent } from './ecommerce/ecommerce-form/ecommerce-form.component';
import { EcommerceListComponent } from './ecommerce/ecommerce-list/ecommerce-list.component';
import { Routes } from '@angular/router';
import { AdminGuard } from '../../core/guard/admin.guard';
import { ChargeFormComponent } from './charge/charge-form/charge-form.component';
import { ChargeListComponent } from './charge/charge-list/charge-list.component';
import { CouponFormComponent } from './coupon/coupon-form/coupon-form.component';
import { CouponListComponent } from './coupon/coupon-list/coupon-list.component';
import { MembershipClubFormComponent } from './membership-club/membership-club-form/membership-club-form.component';
import { ReferralFormComponent } from './referral/referral-form/referral-form.component';
import { TaxFormComponent } from './tax/tax-form/tax-form.component';
import { TaxListComponent } from './tax/tax-list/tax-list.component';
import { WalletFormComponent } from './wallet/wallet-form/wallet-form.component';
import { ZoneFormComponent } from './zone/zone-form/zone-form.component';
import { ZoneListComponent } from './zone/zone-list/zone-list.component';
import { RewardListComponent } from './reward/reward-list/reward-list.component';
import { RewardFormComponent } from './reward/reward-form/reward-form.component';
import { from } from 'rxjs';

export const SettingsRoutes: Routes = [
  {
    path: 'referral',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'settings',
        component: ReferralFormComponent,
      }],
  },
  {
    path: 'coupons',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'list',
        component: CouponListComponent,
      },
      {
        path: 'add/new',
        component: CouponFormComponent,
      },
      {
        path: 'edit/:id',
        component: CouponFormComponent,
      }],
  },
  {
    path: 'zone',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'list',
        component: ZoneListComponent,
      },
      {
        path: 'add/new',
        component: ZoneFormComponent,
      },
      {
        path: 'edit/:id',
        component: ZoneFormComponent,
      }],
  },
  {
    path: 'reward',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'list',
        component: RewardListComponent,
      },
      {
        path: 'add/new',
        component: RewardFormComponent,
      },
      {
        path: 'edit/:id',
        component: RewardFormComponent,
      }],
  },
  {
    path: 'tax',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'list',
        component: TaxListComponent,
      },
      {
        path: 'add/new',
        component: TaxFormComponent,
      },
      {
        path: 'edit/:id',
        component: TaxFormComponent,
      }],
  },
  {
    path: 'charge',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'list',
        component: ChargeListComponent,
      },
      {
        path: 'add/new',
        component: ChargeFormComponent,
      },
      {
        path: 'edit/:id',
        component: ChargeFormComponent,
      }],
  },
  {
    path: 'ecommerce',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'list',
        component: EcommerceListComponent,
      },
      {
        path: 'add/new',
        component: EcommerceFormComponent,
      },
      {
        path: 'edit/:id',
        component: EcommerceFormComponent,
      }],
  },
  {
    path: 'zonemanager',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'list',
        component: ZoneManagerListComponent,
      },
      {
        path: 'add/new',
        component: ZoneManagerFormComponent,
      },
      {
        path: 'edit/:id',
        component: ZoneManagerFormComponent,
      }],
  },
  {
    path: 'subadmin',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'list',
        component: SubadminListComponent,
      },
      {
        path: 'add/new',
        component: SubadminFormComponent,
      },
      {
        path: 'edit/:id',
        component: SubadminFormComponent,
      }],
  },
  {
    path: 'wallet',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'setting',
        component: WalletFormComponent,
      }],
  },
  {
    path: 'membership-club',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'setting',
        component: MembershipClubFormComponent,
      }],
  },
];
