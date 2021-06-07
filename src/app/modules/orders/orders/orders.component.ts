import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../../core/auth.service';
import { FirestoreService } from '../../../core/firestore.service';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';
import { ViewPopupComponent } from '../../reports/modal-pop/view-popup/view-popup.component';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: any;
  outletID: string | null;
  options: any = {
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    },
    maxSpan: 1,
    alwaysShowCalendars: true,
    locale: { format: 'YYYY-MM-DD' },
    parentEl: '#daterangepicker-panel',
  };
  daterange: any = {};
  selDate: any;
  // startDate: any = null;
  // endDate: any = null;
  orderRefSub: Subscription;
  reportsItem: any;
  lodash: any;

  constructor(
    public auth: AuthService,
    private fireDB: FirestoreService,
    public orderService: OrderService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) {
    this.lodash = _;
  }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 4].snapshot.paramMap.get('outletid');
    const today = new Date();
    this.selDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
    // this.startDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0));
    // this.endDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 99));
    this.updateOrderDate();
  }

  selectedDate(event: any) {
    // any object can be passed to the selected event and it will be passed back here
    // datepicker.start = value.start;
    // datepicker.end = value.end;

    // or manupulat your own internal property
    // this.daterange.start = value.start;
    // this.daterange.end = value.end;
    // this.daterange.label = value.label;

    // this.startDate = new Date(Date.UTC(value.start.year(), value.start.month(), value.start.date(), 0, 0, 0, 0));
    // this.endDate = new Date(Date.UTC(value.end.year(), value.end.month(), value.end.date(), 23, 59, 59, 99));
    this.updateOrderDate();
  }
  viewDetails(order: any) {
    console.log(order);
    const modalRef = this.modalService.open(ViewPopupComponent, { size: 'lg' });
    modalRef.componentInstance.reportsItem = order;
  }
  updateOrderDate() {
    const startDate = new Date(Date.UTC(this.selDate.year, this.selDate.month - 1, this.selDate.day, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(this.selDate.year, this.selDate.month - 1, this.selDate.day, 23, 59, 59, 99));
    console.log(startDate);
    console.log(endDate);
    console.log(this.selDate);
    this.orderRefSub = this.fireDB.colWithIds$(`orders`, (ref: any) => {
      if (this.outletID) {
        return ref
          .where('info.isCompleted', '==', false)
          .where('outlet.id', '==', this.outletID)
          .where('info.timeslot', '>', startDate)
          .where('info.timeslot', '<', endDate)
          .orderBy('info.timeslot', 'asc');
      } else {
        return ref
          .where('info.isCompleted', '==', false)
          .where('info.timeslot', '>', startDate)
          .where('info.timeslot', '<', endDate)
          .orderBy('info.timeslot', 'asc');
      }
    }).subscribe((ordersList: any) => {
      console.log(ordersList);
      this.orders = _.groupBy(ordersList, 'info.status');
    });
  }

  ngOnDestroy() {
    this.orderRefSub.unsubscribe();
  }
  printOrder() {
    window.print();
  }

}
