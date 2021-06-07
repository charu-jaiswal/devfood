import { Component } from '@angular/core';
// import { DaterangepickerConfig } from 'ng2-daterangepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  // constructor(
  //   private daterangepickerOptions: DaterangepickerConfig
  // ) {
  //   this.daterangepickerOptions.settings = {
  //     locale: { format: 'YYYY-MM-DD' },
  //     alwaysShowCalendars: true
  //   };
  // }

  onActivate(event: any, outlet: any) {
    // outlet.scrollTop = 0;
  }
}
