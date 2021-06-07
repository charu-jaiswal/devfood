import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../core/shared.module';
import { DesignRoutes } from './design.routing';
import { AdBannerFormComponent } from './ad-banner/ad-banner-form/ad-banner-form.component';
import { AdBannerListComponent } from './ad-banner/ad-banner-list/ad-banner-list.component';
import { AppStoreSettingsFormComponent } from './app-store-settings/app-store-settings-form/app-store-settings-form.component';
import { AppAppearanceFormComponent } from './app-appearance/app-appearance-form/app-appearance-form.component';
import { WalkthroughFormComponent } from './walkthrough/walkthrough-form/walkthrough-form.component';
import { WalkThroughListComponent } from './walkthrough/walkthrough-list/walkthrough-list.component';
import { OutletCategoryFormComponent } from './outlet-category/outlet-category-form/outlet-category-form.component';
import { OutletCategoryListComponent } from './outlet-category/outlet-category-list/outlet-category-list.component';

import { HttpClientModule } from '@angular/common/http';
import { WaveModule } from '../../shared/wave/wave.module';

import { IonRangeSliderModule } from 'ng2-ion-range-slider';

import { Daterangepicker } from 'ng2-daterangepicker';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestAppFormComponent } from './request-app/request-app-form/requestApp-form.component';

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
        RouterModule.forChild(DesignRoutes),
        IonRangeSliderModule,
    ],
    declarations: [
        AdBannerFormComponent,
        AdBannerListComponent,
        AppStoreSettingsFormComponent,
        AppAppearanceFormComponent,
        WalkthroughFormComponent,
        WalkThroughListComponent,
        RequestAppFormComponent,
        OutletCategoryFormComponent,
        OutletCategoryListComponent,
    ],
})
export class DesignModule { }
