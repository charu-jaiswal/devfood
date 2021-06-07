import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FirestoreService } from '../../../../core/firestore.service';
import { ReportsFirePath, OutletFirePath, GlobalSettingFirePath, OutletCateFirePath } from '../../../firestore.path';
import { Reports, defaultReports, listCol, listSelectCol } from '../reports.model';
import { ReportListService } from './reports-list.services';
import { Status, PaymentType, OrderType } from '../../../../shared/common';
import { AuthService } from './../../../../core/auth.service';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import * as _ from 'lodash';
import { MapsAPILoader } from '@agm/core';
import { ViewPopupComponent } from '../../modal-pop/view-popup/view-popup.component';
// import { FormControl } from '@angular/forms';
// import { } from 'googlemaps';

@Component({
  selector: 'brand-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css'],
})
export class ReportsListComponent implements OnInit {
  timezone = 'GMT';
  zoom = 15;
  listColumn = listCol;
  listOutlets: any;
  outletCatList: any;
  listStatus: any;
  listPaymentType: any;
  listOrderType: any;
  reportsList: any;
  reportsItem: any;
  outlets: any;
  response: any = {
    limit: 0,
    page: 0,
    pages: 0,
  };
  optionsExportFile: any;
  loading: Boolean;
  dataPost: any;
  settingsDateFrom: any;
  settingsDateTo: any;
  timeout: any = undefined;
  valuesTime: any = [];
  outletID: any;
  daterange: any = {};
  globalSetting: any;
  digitNum: any = '1.1-2';
  options: any = {
    ranges: {
      'Today': [moment(), moment()],
      'Last 7 Days': [moment().subtract(7, 'days'), moment()],
      'Next 7 Days': [moment(), moment().add(7, 'days')],
      'Last & Next - 7 Days': [moment().subtract(7, 'days'), moment().add(7, 'days')],
      // 'This Month': [moment().startOf('month'), moment().endOf('month')],
      // 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    },
    alwaysShowCalendars: true,
    locale: { format: 'YYYY-MM-DD' },
    parentEl: '#daterangepicker-panel',
    startDate: new Date(moment().subtract(7, 'days').valueOf()),
    endDate: new Date(moment().add(7, 'days').valueOf()),
  };
  dropdownSettings = {
    singleSelection: false,
    text: 'Select Column show',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: false,
    classes: 'myclass custom-class',
    badgeShowLimit: 3,
    labelKey: 'label',
  };
  selectedItems = listSelectCol;
  showCol: any = {};

  // @ViewChild("search")
  // public searchElementRef: ElementRef;

  constructor(
    private reportListService: ReportListService,
    public fireDB: FirestoreService,
    public toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.listOutlets = [];
    this.outletCatList = [];
    this.listOrderType = [];
    this.listPaymentType = [];
    this.listStatus = [];
    const title = 'DevFood';
    // this.loading = true;
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
    const initStartDate = new Date(moment().subtract(7, 'days').valueOf());
    const initEndDate = new Date(moment().add(7, 'days').valueOf());
    this.reportsList = [];
    this.dataPost = {
      customName: '',
      outlet: '',
      outletCat: '',
      payment: '',
      type: '',
      status: '',
      mobileNo: '',
      orderID: '',
      grandTotal: {
        from: 0,
        to: 5000,
      },
      dateFrom: new Date(Date.UTC(initStartDate.getFullYear(), initStartDate.getMonth(), initStartDate.getDate(), 0, 0, 0, 0)).toUTCString(),
      dateTo: new Date(Date.UTC(initEndDate.getFullYear(), initEndDate.getMonth(), initEndDate.getDate(), 23, 59, 59, 99)).toUTCString(),
      pageNo: 1,
      pageSize: 10,
      restaID: this.auth.restaID,
    };

    const FbDbSubscribe1 = this.fireDB.colWithIds$(`${OutletFirePath}`).subscribe((response: any) => {
      this.listOutlets = response;
      FbDbSubscribe1.unsubscribe();
    });
    this.fireDB.colWithIds$(`${OutletCateFirePath}`).subscribe((outletCatData) => {
      this.outletCatList = outletCatData;
    });

    const FbDbSubscribe3 = this.fireDB.doc$(`${GlobalSettingFirePath}`).subscribe((globalSettingData: any) => {
      this.globalSetting = globalSettingData;
      FbDbSubscribe3.unsubscribe();
      this.digitNum = `1.1-2`;
      this.timezone = _.get(globalSettingData, 'time.zone', 'GMT');
    });
    this.reportsItem = defaultReports;
    this.listStatus = Status;
    this.listPaymentType = PaymentType;
    this.listOrderType = OrderType;
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 4].snapshot.paramMap.get('outletid');
    // console.log(this.outletID);
    if (this.outletID) {
      this.dataPost.outlet = this.outletID;
      this.loadList();
    } else {
      this.loadList();
    }
    this.handleShowCol();
  }

  handleShowCol() {
    this.showCol = {};
    for (let index = 0; index < this.listColumn.length; index++) {
      const element = this.listColumn[index];
      let flag = false;
      for (let index2 = 0; index2 < this.selectedItems.length; index2++) {
        const element2 = this.selectedItems[index2];
        if (element2.id === element.id) {
          flag = true;
          break;
        }
      }
      if (flag) {
        this.showCol[element.id] = true;
      } else {
        this.showCol[element.id] = false;
      }
    }
  }

  loadList() {
    this.reportsList = [];
    this.dataPost.pageSize = parseInt(this.dataPost.pageSize, 10);
    this.dataPost.timezone = this.timezone;
    // // start: remove when pagination done
    // delete this.dataPost.pageNo;
    // delete this.dataPost.pageSize;
    // // end: remove when pagination done
    this.loading = true;
    this.reportListService.getListOrders(this.dataPost).subscribe((response: any) => {
      const result = JSON.parse(response._body);
      if (result.status) {
        if (result.data !== undefined) {
          this.response = result.pagination;
          this.reportsList = result.data;
          // console.log(result.data);
        }
      } else {
        alert(result.statusText);
      }
      this.loading = false;
    });
  }


  syncOrder() {
    this.reportListService.syncOrder(this.auth.restaID).subscribe((response: any) => {
      this.toastr.success('Sync Done', 'Success!');
      this.onSearch();
    });
  }

  viewDetails(order: any) {
    console.log(order);
    const modalRef = this.modalService.open(ViewPopupComponent, { size: 'lg' });
    modalRef.componentInstance.reportsItem = order;
  }

  deleteItem(item: any) {
    // console.log(item);
    const tmp = confirm('Are you want to delete this item?');
    // this.fireDB.delete(`/resta/${item.restaID}/orders/${item.id}`);
    if (tmp) {
      this.fireDB.afs.doc<any>(`/resta/${item.restaID}/orders/${item.id}`).delete()
        .then((response: any) => {
          // console.log(response);
          this.onSearch();
        })
        .catch((error: any) => {
          this.toastr.error(error, 'Error!');
        });
    }
  }

  onPaginationChange(page: any) {
    // console.log(page);
    this.loading = true;
    this.dataPost.pageNo = page;
    this.loadList();
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
      this.loading = true;
      this.loadList();
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

  exportData() {
    const querry = { ...this.dataPost };
    querry['format'] = 'csv';
    this.reportListService.getListOrders(querry).subscribe((response: any) => {
      // const result = JSON.parse(response._body);
      const blob = new Blob([response._body], { type: 'text/csv' });
      const filename = 'customer-report.csv';
      FileSaver.saveAs(blob, filename);
    });
  }

  onItemSelect(item: any) {
    this.showCol[item.id] = true;
  }
  OnItemDeSelect(item: any) {
    this.showCol[item.id] = false;
  }
  onSelectAll(items: any) {
    this.handleShowCol();
  }
  onDeSelectAll(items: any) {
    this.handleShowCol();
  }
  printOrder() {
    window.print();
  }
}
