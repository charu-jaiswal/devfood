import { Routes } from '@angular/router';
import { AdminGuard } from '../../core/guard/admin.guard';
import { AdminRedirectGuard } from '../../core/guard/admin-redirect.guard';
import { AdBannerFormComponent } from './ad-banner/ad-banner-form/ad-banner-form.component';
import { AdBannerListComponent } from './ad-banner/ad-banner-list/ad-banner-list.component';
import { AppAppearanceFormComponent } from './app-appearance/app-appearance-form/app-appearance-form.component';
import { WalkThroughListComponent } from './walkthrough/walkthrough-list/walkthrough-list.component';
import { WalkthroughFormComponent } from './walkthrough/walkthrough-form/walkthrough-form.component';
import { AppStoreSettingsFormComponent } from './app-store-settings/app-store-settings-form/app-store-settings-form.component';
import { RequestAppFormComponent } from './request-app/request-app-form/requestApp-form.component';
import { OutletCategoryFormComponent } from './outlet-category/outlet-category-form/outlet-category-form.component';
import { OutletCategoryListComponent } from './outlet-category/outlet-category-list/outlet-category-list.component';

export const DesignRoutes: Routes = [
    {
        path: 'ad-banner',
        canActivate: [AdminGuard],
        children: [
            {
                path: 'list',
                component: AdBannerListComponent,
            },
            {
                path: 'add/new',
                component: AdBannerFormComponent,
            },
            {
                path: 'edit/:id',
                component: AdBannerFormComponent,
            }],
    },
    {
        path: 'outlet-category',
        canActivate: [AdminGuard],
        children: [
            {
                path: 'list',
                component: OutletCategoryListComponent,
            },
            {
                path: 'add/new',
                component: OutletCategoryFormComponent,
            },
            {
                path: 'edit/:id',
                component: OutletCategoryFormComponent,
            }],
    },
    {
        path: 'app-store-settings',
        canActivate: [AdminRedirectGuard],
        children: [
            {
                path: 'setting',
                component: AppStoreSettingsFormComponent,
            }],
    },
    {
        path: 'app-appearance',
        canActivate: [AdminRedirectGuard],
        children: [
            {
                path: 'setting',
                component: AppAppearanceFormComponent,
            }],
    },
    {
        path: 'request-app',
        canActivate: [AdminRedirectGuard],
        children: [
            {
                path: 'setting',
                component: RequestAppFormComponent,
            }],
    },
    {
        path: 'walk-through',
        canActivate: [AdminGuard],
        children: [
            {
                path: 'list',
                component: WalkThroughListComponent,
            },
            {
                path: 'add/new',
                component: WalkthroughFormComponent,
            },
            {
                path: 'edit/:id',
                component: WalkthroughFormComponent,
            }],
    },

];
