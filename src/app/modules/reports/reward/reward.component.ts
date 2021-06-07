import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../../core/firestore.service';
import { RewardsListService } from './reward.services';
import { AuthService } from './../../../core/auth.service';
import * as FileSaver from 'file-saver';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'brand-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css'],
})
export class RewardListComponent implements OnInit {
  reportsList: any;
  response: any = {
    limit: 0,
    page: 0,
    pages: 0,
  };
  loading: Boolean;
  dataPost: any;
  timeout: any = undefined;
  digitNum: any = '1.1-2';
  settingsDateFrom: any;
  settingsDateTo: any;
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
    private reportListService: RewardsListService,
    public fireDB: FirestoreService,
    public toastr: ToastrService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.reportsList = [];
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
      uid: '',
      dateFrom: new Date(Date.UTC(initStartDate.getFullYear(), initStartDate.getMonth(), initStartDate.getDate(), 0, 0, 0, 0)).toUTCString(),
      dateTo: new Date(Date.UTC(initEndDate.getFullYear(), initEndDate.getMonth(), initEndDate.getDate(), 23, 59, 59, 99)).toUTCString(),
      pageNo: 1,
      pageSize: 10,
      restaID: this.auth.restaID,
    };
    this.loadList();
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
    this.loadList();
  }

  loadList() {
    this.reportsList = [];
    this.dataPost.pageSize = parseInt(this.dataPost.pageSize, 10);
    this.loading = true;
    this.reportListService.getRewardListData(this.dataPost).subscribe((response: any) => {
      const result = JSON.parse(response._body);
      if (result.status) {
        if (result.data !== undefined) {
          this.response = result.pagination;
          this.reportsList = result.data;
        }
      } else {
        alert(result.statusText);
      }
      this.loading = false;
    });
  }

  onPaginationChange(page: any) {
    this.loading = true;
    this.dataPost.pageNo = page;
    this.loadList();
  }

  onSearch() {
    this.dataPost.pageNo = 1;
    if (this.timeout !== undefined) {
      clearInterval(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.loading = true;
      this.loadList();
    }, 1000);
  }

  printOrder() {
    window.print();
  }

}
