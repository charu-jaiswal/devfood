import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Component, OnInit, ElementRef, Input,
} from '@angular/core';
import { OrderService } from '../../../orders/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { FirestoreService } from '../../../../core/firestore.service';
@Component({
  selector: 'app-view-popup',
  templateUrl: './view-popup.component.html',
  styleUrls: ['./view-popup.component.css'],
})

export class ViewPopupComponent implements OnInit {
  @Input() reportsItem: any;
  orderList: any;
  digitNum: any = '1.1-2';
  public searchElementRef: ElementRef;
  statusList = [{
    value: 'ORD_PLACED',
    label: 'Order Placed',
    table: 'Pending',
    color: 'secondary',
    order: 1,
  }, {
    value: 'PROCESSING',
    label: 'Processing',
    color: 'warning',
    order: 2,
  }, {
    value: 'RDY_DELIVERY',
    label: 'Ready For Delivery',
    color: 'dark',
    order: 4,
  }, {
    value: 'DELIVERED',
    label: 'Delivered',
    color: 'success',
    table: 'Approved',
    order: 6,
  }, {
    value: 'CANCELLED',
    label: 'Cancelled',
    color: 'danger',
    table: 'Cancelled',
    order: 7,
  }];
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    public orderService: OrderService,
    private modalService: NgbModal) { }
  ngOnInit() {

    // popup
  }
  printOrder() {
    window.print();
  }
  closeModal() {
    this.activeModal.close();
  }
}
