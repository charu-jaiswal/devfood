import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Component, OnInit, ElementRef, Input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { FirestoreService } from '../../../../core/firestore.service';
import { ViewPopupComponent } from '../view-popup/view-popup.component';
@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.css'],
})

export class OrderPopupComponent implements OnInit {
  @Input() orderUser: any;
  orderList: any;
  public searchElementRef: ElementRef;
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal) { }
  ngOnInit() {
    this.fireDB.colWithIds$(`orders`, (ref: any) => {
      return ref.where('user.uid', '==', this.orderUser.uid)
        .orderBy('info.created_at', 'desc')
        .limit(10);
    }).subscribe((orders: any) => {
      this.orderList = orders;
    });
  }
  viewDetails(order: any) {
    console.log(order);
    const modalRef = this.modalService.open(ViewPopupComponent, { size: 'lg' });
    modalRef.componentInstance.reportsItem = order;
  }
}