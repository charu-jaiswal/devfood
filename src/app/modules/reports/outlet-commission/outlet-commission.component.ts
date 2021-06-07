import { Component, OnInit } from '@angular/core';
import { OutletCommissionServices } from './outlet-commission.services';
import { Status, PaymentType, OrderType } from '../../../shared/common';
import { FirestoreService } from '../../../core/firestore.service';
import { ReportsFirePath, OutletFirePath, GlobalSettingFirePath, OutletCateFirePath } from '../../firestore.path';
import { AuthService } from './../../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-outlet-commission',
  templateUrl: './outlet-commission.component.html',
  styleUrls: ['./outlet-commission.component.css'],
})
export class OutletCommissionComponent implements OnInit {
  orderTypes = {
    'DELIVERY': {
      type: 'delivery',
      condition: 'isDelivery',
    },
    'TAKEAWAY': {
      type: 'takeAway',
      condition: 'isTakeAway',
    },
  };
  commissionType = 'type1';
  listOutlets: any;
  outletCatList: any;
  listStatus: any;
  listPaymentType: any;
  listOrderType: any;
  loading: Boolean;
  dataPost: any;
  outletID: any;
  listOutletSelect: any;
  timeout: any = undefined;
  settingsDateFrom: any;
  settingsDateTo: any;
  outletCommission: any;
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
    private outletCommissionServices: OutletCommissionServices,
    public fireDB: FirestoreService,
    public toastr: ToastrService,
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
    const initStartDate = new Date(moment().subtract(29, 'days').valueOf());
    const initEndDate = new Date(moment().valueOf());
    const today = new Date();
    this.dataPost = {
      customName: '',
      outlet: '',
      outletCat: '',
      payment: '',
      type: '',
      status: 'DELIVERED',
      mobileNo: '',
      dateFrom: new Date(Date.UTC(initStartDate.getFullYear(), initStartDate.getMonth(), initStartDate.getDate(), 0, 0, 0, 0)).toUTCString(),
      dateTo: new Date(Date.UTC(initEndDate.getFullYear(), initEndDate.getMonth(), initEndDate.getDate(), 23, 59, 59, 99)).toUTCString(),
      restaID: this.auth.restaID,
    };
    this.fireDB.colWithIds$(`${OutletFirePath}`).subscribe((response: any) => {
      // console.log(response);
      this.listOutletSelect = response;
      _.forEach(response, (outlet: any) => {
        this.listOutlets[outlet.id] = outlet;
      });
    });
    this.fireDB.colWithIds$(`${OutletCateFirePath}`).subscribe((outletCatData) => {
      this.outletCatList = outletCatData;
    });
    const FbDbSubscribe1 = this.fireDB.doc$(`${GlobalSettingFirePath}`).subscribe((response: any) => {
      // console.log(response);
      if (_.get(response, 'driverFee.commissionType')) {
        this.commissionType = _.get(response, 'driverFee.commissionType');
      }
      FbDbSubscribe1.unsubscribe();
    });
    this.listStatus = Status;
    this.listPaymentType = PaymentType;
    this.listOrderType = OrderType;
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 4].snapshot.paramMap.get('outletid');
    if (this.outletID) {
      this.dataPost.outlet = this.outletID;
      this.loadOutletCommission();
    } else {
      this.loadOutletCommission();
    }
  }

  hasProperty(obj: any, prop: string) {
    return _.has(obj, prop);
  }

  loadOutletCommission() {
    if (!this.loading) {
      this.loading = true;
      this.outletCommission = [];
      // this.dataPost['dateFrom'] = this.dataPost['dateFrom'].toISOString().slice(0, 10);
      // this.dataPost['dateTo'] = this.dataPost['dateFrom'].toISOString().slice(0, 10);
      this.dataPost['restaID'] = this.auth.restaID;
      // console.log(this.dataPost);
      this.outletCommissionServices.getOutlet(this.dataPost).subscribe((response: any) => {
        const result = JSON.parse(response._body);
        if (result.status) {
          if (result.data !== undefined) {
            this.outletCommission = result.data;
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
      this.loadOutletCommission();
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

  printOutletCommission() {
    window.print();
  }

}
