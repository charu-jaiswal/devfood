import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../core/shared.module';
import { TutorialRoutes } from './tutorial.routing';

import { HttpClientModule } from '@angular/common/http';
import { WaveModule } from '../../shared/wave/wave.module';

import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { AgmCoreModule } from '@agm/core';
import { Daterangepicker } from 'ng2-daterangepicker';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { TutorialComponent, NgbdModalContent } from './tutorial/tutorial.component';
import { OutletPaymentComponent } from './outlet-payment/outlet-payment.component';

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
    RouterModule.forChild(TutorialRoutes),
    IonRangeSliderModule,
  ],
  declarations: [

  TutorialComponent, NgbdModalContent, OutletPaymentComponent],
  entryComponents: [NgbdModalContent],
  providers: [
  ],
})
export class TutorialModule { }
