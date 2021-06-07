import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirestoreService } from '../../../../core/firestore.service';
import * as _ from 'lodash';
import { UsersFirePath } from '../../../firestore.path';
import { ViewPopupComponent } from '../../modal-pop/view-popup/view-popup.component';
import { OrderPopupComponent } from '../../modal-pop/order-popup/order-popup.component';

@Component({
  selector: 'brand-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userID: any;
  customer: any = {};
  walletTrans: any = [];
  addressRef: any;
  walletModel: any;
  reportsList: any;
  orderList: any = [];
  constructor(
    public fireDB: FirestoreService,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('id');
    this.fireDB.doc$(`${UsersFirePath}/${this.userID}`).subscribe((userData: any) => {
      this.customer = userData;
      console.log(this.customer);
    });
    this.addressRef = this.fireDB.colWithIds$(`${UsersFirePath}/${this.userID}/address`);
    this.fireDB.colWithIds$(`${UsersFirePath}/${this.userID}/walletTrans`, (ref: any) => {
      return ref.orderBy('time', 'desc')
        .limit(10);
    }).subscribe((response: any) => {
      this.walletTrans = response;
    });
    this.fireDB.colWithIds$(`orders`, (ref: any) => {
      return ref.where('user.uid', '==', this.userID)
        .orderBy('info.created_at', 'desc')
        .limit(10);
    }).subscribe((orders: any) => {
      this.orderList = orders;
    });
  }

  viewDetails(order: any) {
    const modalRef = this.modalService.open(ViewPopupComponent, { size: 'lg' });
    modalRef.componentInstance.reportsItem = order;
  }

  banUser() {
    const response = confirm('are you sure you want to Ban?');
    if (response) {
      this.fireDB.update(`${UsersFirePath}/${this.userID}`, {
        isBan: !this.customer.isBan,
      });
      this.toastr.success('User was Baned', 'Success!');
    }
    return;
  }

  addWalletForm(walletForm: NgForm) {
    const response = confirm('are you sure you add to Wallet?');
    if (response) {
      if (!walletForm.invalid) {
        const currentTime = new Date();
        this.fireDB.add(`${UsersFirePath}/${this.userID}/walletTrans`, {
          type: 'admin_wallet_reload',
          desc: walletForm.form.value.desc,
          amount: walletForm.form.value.amount,
          time: currentTime,
        });
        const currentWalletAmnt = _.get(this.customer, 'wallet.reload', 0);

        const userUpdate: any = {};
        userUpdate['wallet.reload'] = (currentWalletAmnt + walletForm.form.value.amount);
        this.fireDB.doc(`${UsersFirePath}/${this.userID}`).update(userUpdate);
        this.toastr.success('wallet added', 'Success!');
        this.walletModel.dismiss();
      }
      return;
    } else {
      this.fireDB.validateAllFormFields(walletForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }
  wallets(content: any, selUser: any) {
    this.fireDB.colWithIds$(`${UsersFirePath}/${this.userID}/walletTrans`, (ref: any) => {
      return ref.orderBy('time', 'desc')
        .limit(15);
    }).subscribe((response: any) => {
      this.walletTrans = response;
    });
    this.modalService.open(content, { size: 'lg' });
    this.customer = selUser;
  }

  addWallet(wallet: any) {
    this.walletModel = this.modalService.open(wallet, { size: 'sm' });
  }
  order(selUser: any) {
    const modalRef = this.modalService.open(OrderPopupComponent, { size: 'lg' });
    modalRef.componentInstance.orderUser = selUser;
  }
  openMap(address: any) {
    window.open(`http://maps.google.com/?q=${address.position.lat},${address.position.lng}`, '_blank');
  }
}
