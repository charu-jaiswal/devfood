import { ZoneManagerListComponent } from './zonemanager/zone-manager-list/zone-manager-list.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { QuillModule } from "ngx-quill";
import { SharedModule } from "../../core/shared.module";
import { ChargeFormComponent } from "./charge/charge-form/charge-form.component";
import { ChargeListComponent } from "./charge/charge-list/charge-list.component";
import { CouponFormComponent } from "./coupon/coupon-form/coupon-form.component";
import { CouponListComponent } from "./coupon/coupon-list/coupon-list.component";
import { MembershipClubFormComponent } from "./membership-club/membership-club-form/membership-club-form.component";
import { ReferralFormComponent } from "./referral/referral-form/referral-form.component";
import { SettingsRoutes } from "./settings.routing";
import { TaxFormComponent } from "./tax/tax-form/tax-form.component";
import { TaxListComponent } from "./tax/tax-list/tax-list.component";
import { WalletFormComponent } from "./wallet/wallet-form/wallet-form.component";
import { ZoneFormComponent } from "./zone/zone-form/zone-form.component";
import { ZoneListComponent } from "./zone/zone-list/zone-list.component";
import { RewardListComponent } from "./reward/reward-list/reward-list.component";
import { RewardFormComponent } from "./reward/reward-form/reward-form.component";
import { ClipboardModule } from "ngx-clipboard";
import { EcommerceFormComponent } from "./ecommerce/ecommerce-form/ecommerce-form.component";
import { EcommerceListComponent } from "./ecommerce/ecommerce-list/ecommerce-list.component";

import { SubadminFormComponent } from './subadmin/subadmin-form/subadmin-form.component';
import { SubadminListComponent } from './subadmin/subadmin-list/subadmin-list.component';
import { EqualValidator } from "./subadmin/equal-validator.directive";
import { ZoneManagerFormComponent } from './zonemanager/zone-manager-form/zone-manager-form.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    QuillModule,
    NgbModule,
    NgSelectModule,
    RouterModule.forChild(SettingsRoutes),
    ClipboardModule,
  ],
  declarations: [
    EqualValidator,
    ReferralFormComponent,
    TaxFormComponent,
    TaxListComponent,
    ChargeFormComponent,
    ChargeListComponent,
    WalletFormComponent,
    MembershipClubFormComponent,
    CouponListComponent,
    CouponFormComponent,
    ZoneListComponent,
    ZoneFormComponent,
    RewardListComponent,
    RewardFormComponent,

    EcommerceFormComponent,
    EcommerceListComponent,
    ZoneFormComponent,
    ZoneListComponent,
    
    SubadminFormComponent,
    SubadminListComponent,
    ZoneManagerFormComponent,
    ZoneManagerListComponent
    
   
  ],
  providers: [],
})
export class SettingsModule {}
