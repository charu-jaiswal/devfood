import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ErrorHandler } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import {NgPipesModule} from 'ngx-pipes';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SpinnerComponent } from './shared/spinner.component';
import { GlobalErrorHandler } from './global-error-handler';
// import { Daterangepicker } from 'ng2-daterangepicker';

export const firebaseConfig = environment.firebaseConfig;

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    SidebarComponent,
  ],
  imports: [
    // Daterangepicker,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,

    CoreModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    PerfectScrollbarModule,
    NgPipesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [
    NgbActiveModal,
  // {
  //   provide: ErrorHandler,
  //   useClass: GlobalErrorHandler
  // },
  {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
  }, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  }],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
  // constructor(private afs: AngularFirestore) {
  //   const firestore = afs.firestore.settings({ timestampsInSnapshots: true });
  //   /* afs.firestore.enablePersistence(); */
  // }
}
