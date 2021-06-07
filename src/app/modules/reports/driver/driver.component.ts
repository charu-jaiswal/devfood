import { Component, OnInit } from '@angular/core';
import { DriverReportServices } from './driver.services';
import { Status, PaymentType, OrderType } from '../../../shared/common';
import { FirestoreService } from '../../../core/firestore.service';
import { ReportsFirePath, OutletFirePath , GlobalSettingFirePath, OutletCateFirePath} from '../../firestore.path';
import { AuthService } from './../../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-diver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverReportComponent implements OnInit {
  driverFee: any;
  listOutlets: any;
  outletCatList: any;
  listStatus: any;
  listPaymentType: any;
  listOrderType: any;
  loading: Boolean;
  dataPost: any;
  timeout: any = undefined;
  settingsDateFrom: any;
  settingsDateTo: any;
  driverReport: any;
  daterange: any = {};
  options: any = {
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    },
    alwaysShowCalendars: true,
    locale: { format: 'YYYY-MM-DD' },
    parentEl: '#daterangepicker-panel',
    startDate: new Date(moment().subtract(29, 'days').valueOf()),
    endDate: new Date(moment().valueOf()),
  };
  grandTotal = 0;

  constructor(
    private driverReportServices: DriverReportServices,
    public fireDB: FirestoreService,
    public toastr: ToastrService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.driverFee = {};
    this.listOutlets = [];
    this.outletCatList = [];
    this.listOrderType = [];
    this.listPaymentType = [];
    this.listStatus = [];
    this.settingsDateFrom = {
      bigBanner: true,
      timePicker: true,
      format: 'dd-MM-yyyy',
      defaultOpen: false,
    };
    this.settingsDateTo = {
      bigBanner: true,
      timePicker: true,
      format: 'dd-MM-yyyy',
      defaultOpen: false,
    };
    const initStartDate = new Date(moment().subtract(29, 'days').valueOf());
    const initEndDate = new Date(moment().valueOf());
    const today = new Date();
    this.dataPost = {
      customName: '',
      outlet: '',
      outletCat: '',
      payment: '',
      type: 'DELIVERY',
      status: '',
      mobileNo: '',
      // grandTotal: {
      //   from: 0,
      //   to: 5000,
      // },
      dateFrom: new Date(Date.UTC(initStartDate.getFullYear(), initStartDate.getMonth(), initStartDate.getDate(), 0, 0, 0, 0)).toUTCString(),
      dateTo: new Date(Date.UTC(initEndDate.getFullYear(), initEndDate.getMonth(), initEndDate.getDate(), 23, 59, 59, 99)).toUTCString(),
      pageNo: 1,
      pageSize: 10,
      restaID: this.auth.restaID,
    };
    this.fireDB.colWithIds$(`${OutletFirePath}`).subscribe((response: any) => {
      // console.log(response);
      this.listOutlets = response;
    });
    this.fireDB.colWithIds$(`${OutletCateFirePath}`).subscribe((outletCatData) => {
      this.outletCatList = outletCatData;
    });
    this.listStatus = Status;
    this.listPaymentType = PaymentType;
    this.listOrderType = OrderType;
    this.loadDriverReport();
    const FbDbSubscribe3 = this.fireDB.doc$(`${GlobalSettingFirePath}`).subscribe((response: any) => {
      this.driverFee = response.driverFee;
      FbDbSubscribe3.unsubscribe();
    });
  }

  loadDriverReport() {
    if (!this.loading) {
      this.loading = true;
      this.driverReport = [];
      // this.dataPost['dateFrom'] = this.dataPost['dateFrom'].toISOString().slice(0, 10);
      // this.dataPost['dateTo'] = this.dataPost['dateFrom'].toISOString().slice(0, 10);
      this.dataPost['restaID'] = this.auth.restaID;
      // console.log(this.dataPost);
      this.driverReportServices.getOutlet(this.dataPost).subscribe((response: any) => {
        const result = JSON.parse(response._body);
        if (result.status) {
          if (result.data !== undefined) {
            this.driverReport = result.data;
            this.grandTotal = _.sumBy(result.data, 'finalAmtTotal');
          }
        } else {
          alert(result.statusText);
        }
        this.loading = false;
      });
    }
  }

  onChangeGrandTotal() {
    const from = this.dataPost.grandTotal.from;
    const to = this.dataPost.grandTotal.to;
    if (from < 0 || to < 0 || from > to) {
      this.toastr.error('Grand Total Filter Invalid', 'Error!');
    } else {
      this.onSearch();
    }
  }

  onSearch() {
    this.dataPost.pageNo = 1;
    if (this.timeout !== undefined) {
      clearInterval(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.loadDriverReport();
    }, 1000);
  }

  selectedDate(value: any, datepicker?: any) {

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;

    this.dataPost.dateFrom = new Date(Date.UTC(value.start.year(), value.start.month(), value.start.date(), 0, 0, 0, 0)).toUTCString();
    this.dataPost.dateTo = new Date(Date.UTC(value.end.year(), value.end.month(), value.end.date(), 23, 59, 59, 99)).toUTCString();
    this.onSearch();
  }

  printDriverReport() {
    window.print();
  }

}
