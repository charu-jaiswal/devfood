import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/auth.service';
import { FirestoreService } from '../../../core/firestore.service';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';
import { PaymnetPendingPopupComponent } from '../../reports/modal-pop/payament-pending-popup/payment-pending-popup.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-payment-pending',
  templateUrl: './payment-pending.component.html',
  styleUrls: ['./payment-pending.component.css'],
})
export class PaymentPendingComponent implements OnInit, OnDestroy {
  orders: any;
  payment: any;
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
  reportsItem: any;
  lodash: any;

  constructor(
    public auth: AuthService,
    private fireDB: FirestoreService,
    public orderService: OrderService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private http: HttpClient,
    public toastr: ToastrService,
  ) {
    this.lodash = _;
  }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 4].snapshot.paramMap.get('outletid');
    const today = new Date();
    this.startDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0));
    this.endDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 99));
    this.updateOrderDate();
    const FbDbSubscribe = this.fireDB.colWithIds$('tempOrders').subscribe((tempOrderData: any) => {
      this.payment = tempOrderData;
    });
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
  viewDetails(order: any) {
    const modalRef = this.modalService.open(PaymnetPendingPopupComponent, { size: 'lg' });
    modalRef.componentInstance.reportsItem = order;
  }
  updateOrderDate() {
    this.orderRefSub = this.fireDB.colWithIds$(`tempOrder`, (ref: any) => {
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
      this.orders = ordersList;
    });
  }

  processOrder(order: any) {
    const response = confirm('are you sure you want to Process?');
    if (response) {
      this.auth.userAuth.currentUser.getIdToken(true).then((idToken: string) => {
        const orderCreateObs = this.http.post(`${environment.cloudFuncURL}/createOrderAdmin`, {
          adminAuth: {
            idToken,
            uid: this.auth.userAuth.currentUser.uid,
            restaID: this.auth.restaID,
          },
          ...order
        });
        orderCreateObs.subscribe((data: any) => {
          if (data && data.success) {
            this.fireDB.doc(`tempOrder/${order.id}`).delete();
            this.toastr.success('Done');
          } else {
            this.toastr.success('Error. Retry again');
          }
        });
      });
    }
    return;
  }

  deleteOrder(id: any) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.doc(`tempOrder/${id}`).delete();
      this.toastr.success('Order Deleted', 'Success!');
    }
    return;
  }

  ngOnDestroy() {
    this.orderRefSub.unsubscribe();
  }
}
