import { Component, OnInit } from '@angular/core';
import { StatsService } from './stats.services';
import { Status, PaymentType, OrderType } from '../../../shared/common';
import { FirestoreService } from '../../../core/firestore.service';
import { OutletFirePath, OutletCateFirePath } from '../../firestore.path';
import { AuthService } from './../../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  listOutlets: any;
  outletCatList: any;
  listStatus: any;
  listPaymentType: any;
  listOrderType: any;
  loading: Boolean;
  dataPost: any;
  outletID: any;
  timeout: any = undefined;
  settingsDateFrom: any;
  settingsDateTo: any;
  stats: any;
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

  constructor(
    public toastr: ToastrService,
    private statsService: StatsService,
    public fireDB: FirestoreService,
    private auth: AuthService,
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
    const tmpDate = moment().subtract(29, 'days');
    const today = moment();
    this.dataPost = {
      customName: '',
      outlet: '',
      outletCat: '',
      payment: '',
      type: '',
      status: '',
      mobileNo: '',
      grandTotal: {
        from: 0,
        to: 1000,
      },
      orderTime: {
        from: 0,
        to: 1440,
      },
      // dateFrom: new Date(new Date().setHours(0, 0, 0, 0)),
      // dateTo: new Date(new Date().setHours(23, 59, 59, 99)),
      dateFrom: new Date(Date.UTC(tmpDate.year(), tmpDate.month(), tmpDate.date(), 0, 0, 0, 0)).toUTCString(),
      dateTo: new Date(Date.UTC(today.year(), today.month(), today.date(), 23, 59, 59, 99)).toUTCString(),
      // dateFrom: new Date(moment().subtract(29, 'days').valueOf()),
      // dateTo: new Date(moment().valueOf()),
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
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 4].snapshot.paramMap.get('outletid');
    // console.log(this.outletID);
    if (this.outletID) {
      this.dataPost.outlet = this.outletID;
      this.loadSTATS();
    } else {
      this.loadSTATS();
    }
  }

  loadSTATS() {
    if (!this.loading) {
      this.loading = true;
      this.stats = {
        averageSubtotal: 0,
        averageAmount: 0,
        averageFinalAmnt: 0,
        averageFinalPay: 0,
        averageCashback_total: 0,
        amount: 0,
        cashback_coupon: 0,
        cashback_item: 0,
        cashback_total: 0,
        discount: 0,
        finalAmnt: 0,
        finalPay: 0,
        pretotal_charge: 0,
        pretotal_deliFee: 0,
        pretotal_packFee: 0,
        pretotal_roundOff: 0,
        pretotal_tax: 0,
        pretotal_tips: 0,
        subtotal: 0,
        walletUse: 0,
      };
      this.statsService.getStats(this.dataPost).subscribe((response: any) => {
        const result = JSON.parse(response._body);
        if (result.status) {
          if (result.data !== undefined) {
            this.stats = result.data[0];
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
    // console.log(from, to, from < 0 || to < 0 || from > to);
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
      // console.log('load list');
      this.loadSTATS();
    }, 1000);
  }

  selectedDate(value: any, datepicker?: any) {

    // any object can be passed to the selected event and it will be passed back here
    // datepicker.start = value.start;
    // datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;

    this.dataPost.dateFrom = new Date(Date.UTC(value.start.year(), value.start.month(), value.start.date(), 0, 0, 0, 0)).toUTCString();
    this.dataPost.dateTo = new Date(Date.UTC(value.end.year(), value.end.month(), value.end.date(), 23, 59, 59, 99)).toUTCString();
    this.onSearch();
  }

  printDoc() {
    window.print();
  }

}
