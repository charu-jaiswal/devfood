import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../core/auth.service';
import { FirestoreService } from '../../../core/firestore.service';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-table-booking',
  templateUrl: './table-booking.component.html',
  styleUrls: ['./table-booking.component.css'],
})
export class TableBookingComponent implements OnInit, OnDestroy {
  orders: any;
  outletID: string | null;
  options: any = {
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Next 7 Days': [moment(), moment().add(6, 'days')],
    },
    maxSpan: 7,
    alwaysShowCalendars: true,
    locale: { format: 'YYYY-MM-DD' },
    parentEl: '#daterangepicker-panel',
  };
  daterange: any = {};
  startDate: any = null;
  endDate: any = null;
  orderRefSub: Subscription;

  constructor(
    public auth: AuthService,
    private fireDB: FirestoreService,
    public orderService: OrderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 4].snapshot.paramMap.get('outletid');
    const today = new Date();
    this.startDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0));
    this.endDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 99));
    this.updateOrderDate();
  }

  selectedDate(value: any, datepicker?: any) {
    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;

    this.startDate = new Date(Date.UTC(value.start.year(), value.start.month(), value.start.date(), 0, 0, 0, 0));
    this.endDate = new Date(Date.UTC(value.end.year(), value.end.month(), value.end.date(), 23, 59, 59, 99));
    this.updateOrderDate();
  }

  updateOrderDate() {
    this.orderRefSub = this.fireDB.colWithIds$(`reserve`, (ref: any) => {
      if (this.outletID) {
        return ref
          .where('outlet.id', '==', this.outletID)
          .where('info.timeslot', '>', this.startDate)
          .where('info.timeslot', '<', this.endDate)
          .orderBy('info.timeslot', 'asc');
      } else {
        return ref
          .where('info.timeslot', '>', this.startDate)
          .where('info.timeslot', '<', this.endDate)
          .orderBy('info.timeslot', 'asc');
      }
    }).subscribe((ordersList: any) => {
      this.orders = _.groupBy(ordersList, 'info.status');
    });
  }

  ngOnDestroy() {
    this.orderRefSub.unsubscribe();
  }

}
