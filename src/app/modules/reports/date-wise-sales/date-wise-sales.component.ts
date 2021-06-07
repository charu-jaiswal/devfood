import { Component, OnInit } from '@angular/core';
import { DateWiseSalesServices } from './date-wise-sales.services';
import { Status, PaymentType, OrderType } from '../../../shared/common';
import { FirestoreService } from '../../../core/firestore.service';
import { ReportsFirePath, OutletFirePath, OutletCateFirePath, GlobalSettingFirePath } from '../../firestore.path';
import { AuthService } from './../../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-date-wise-sales',
  templateUrl: './date-wise-sales.component.html',
  styleUrls: ['./date-wise-sales.component.css'],
})
export class DateWiseSalesComponent implements OnInit {
  timezone = 'GMT';
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
  dateWiseSales: any;
  daterange: any = {};
  outletID: any;
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
    private dateWiseSalesServices: DateWiseSalesServices,
    public fireDB: FirestoreService,
    public toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
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
      type: '',
      status: '',
      mobileNo: '',
      dateFrom: new Date(Date.UTC(initStartDate.getFullYear(), initStartDate.getMonth(), initStartDate.getDate(), 0, 0, 0, 0)).toUTCString(),
      dateTo: new Date(Date.UTC(initEndDate.getFullYear(), initEndDate.getMonth(), initEndDate.getDate(), 23, 59, 59, 99)).toUTCString(),
      pageNo: 1,
      pageSize: 10,
      restaID: this.auth.restaID,
    };
    this.fireDB.colWithIds$(`${OutletFirePath}`).subscribe((response: any) => {
      this.listOutlets = response;
    });
    this.fireDB.colWithIds$(`${OutletCateFirePath}`).subscribe((outletCatData) => {
      this.outletCatList = outletCatData;
    });
    const FbDbSubscribe1 = this.fireDB
      .doc$(`${GlobalSettingFirePath}`)
      .subscribe((globalSettingData: any) => {
        this.timezone = _.get(globalSettingData, 'time.zone', 'GMT');
        FbDbSubscribe1.unsubscribe();
      });
    this.listStatus = Status;
    this.listPaymentType = PaymentType;
    this.listOrderType = OrderType;
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 4].snapshot.paramMap.get('outletid');
    if (this.outletID) {
      this.dataPost.outlet = this.outletID;
      this.loadOutletWiseSales();
    } else {
      this.loadOutletWiseSales();
    }
  }

  loadOutletWiseSales() {
    if (!this.loading) {
      this.loading = true;
      this.dateWiseSales = [];
      this.dataPost['restaID'] = this.auth.restaID;
      this.dataPost.timezone = this.timezone;
      this.dateWiseSalesServices.getDate(this.dataPost).subscribe((response: any) => {
        const result = JSON.parse(response._body);
        if (result.status) {
          if (result.data !== undefined) {
            this.dateWiseSales = result.data;
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
      this.loadOutletWiseSales();
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

  printOutletWiseSales() {
    window.print();
  }

}
