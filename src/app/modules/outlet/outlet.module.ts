import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../../core/shared.module';
import { AddonFormComponent } from './builder/addon/addon-form/addon-form.component';
import { AddonListComponent } from './builder/addon/addon-list/addon-list.component';
import { CategoryFormComponent } from './builder/category/category-form/category-form.component';
import { CategoryListComponent } from './builder/category/category-list/category-list.component';
import { MenuBuilderComponent } from './builder/menu-builder/menu-builder.component';
import { MenuItemFormComponent } from './builder/menu-item/menu-item-form/menu-item-form.component';
import { MenuItemListComponent } from './builder/menu-item/menu-item-list/menu-item-list.component';
import { MenuFormComponent } from './menu/menu-form/menu-form.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { CatGroupFormComponent } from './cat-group/cat-group-form/cat-group-form.component';
import { CatGroupListComponent } from './cat-group/cat-group-list/cat-group-list.component';
import { OutletRouteComponent } from './outlet-route/outlet-route.component';
import { OutletRoutes } from './outlet.routing';
import { OutletFormComponent } from './outlets/outlet-form/outlet-form.component';
import { OutletListComponent } from './outlets/outlet-list/outlet-list.component';
import { DeliverySetupFormComponent } from './setting/delivery-setup/delivery-setup-form/delivery-setup-form.component';
import { DeliverySetupListComponent } from './setting/delivery-setup/delivery-setup-list/delivery-setup-list.component';
import { TemporaryClosureFormComponent } from './setting/temporary-closure/temporary-closure-form/temporary-closure-form.component';
import { TemporaryClosureListComponent } from './setting/temporary-closure/temporary-closure-list/temporary-closure-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { StartHereComponent } from './start-here/start-here.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { WaveModule } from '../../shared/wave/wave.module';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { HttpModule } from '@angular/http';
import { environment } from '../../../environments/environment';
import { ReservationFormComponent } from './reservation-comp/reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-comp/reservation-list/reservation-list.component';
import { InventoryComponent } from './inventory/inventory.component';


@NgModule({
  imports: [
    ColorPickerModule,
    FormsModule,
    CommonModule,
    SharedModule,
    NgSelectModule,
    QuillModule,
    HttpModule,
    NgbModule,
    WaveModule,
    RouterModule.forChild(OutletRoutes),
    AgmCoreModule.forRoot({
      apiKey: environment.mapKey,
      libraries: ['drawing', 'places'],
    }),
  ],
  declarations: [
    OutletFormComponent,
    OutletListComponent,
    OutletRouteComponent,
    MenuBuilderComponent,
    CategoryFormComponent,
    CategoryListComponent,
    MenuItemFormComponent,
    MenuItemListComponent,
    AddonFormComponent,
    AddonListComponent,
    MenuListComponent,
    MenuFormComponent,
    CatGroupListComponent,
    CatGroupFormComponent,
    UserFormComponent,
    UserListComponent,
    TemporaryClosureFormComponent,
    TemporaryClosureListComponent,
    DeliverySetupFormComponent,
    DeliverySetupListComponent,
    StartHereComponent,
    ReservationFormComponent,
    ReservationListComponent,
    InventoryComponent,
   
  ],
})
export class OutletModule { }
