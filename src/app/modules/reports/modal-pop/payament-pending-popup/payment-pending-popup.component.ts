import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Component, OnInit, ElementRef, Input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { FirestoreService } from '../../../../core/firestore.service';

@Component({
  selector: 'app-view-payemt-popup',
  templateUrl: './payment-pending-popup.component.html',
  styleUrls: ['./payment-pending-popup.component.css'],
})

export class PaymnetPendingPopupComponent implements OnInit {
  @Input() reportsItem: any;
  orderList: any;
  digitNum: any = '1.1-2';
  public searchElementRef: ElementRef;
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal) { }
  ngOnInit() {

    // popup
  }
  printOrder() {
    window.print();
  }
}
