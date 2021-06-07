import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { CouponFirePath } from '../../../firestore.path';
import { Coupon } from '../coupon.model';
import { ClipboardService } from 'ngx-clipboard';
@Component({
  selector: 'coupon-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css'],
})
export class CouponListComponent implements OnInit {
  couponsList: Observable<Coupon[]>;

  constructor(public fireDB: FirestoreService, public toastr: ToastrService, private _clipboardService: ClipboardService) { }

  ngOnInit() {
    this.couponsList = this.fireDB.colWithIds$(CouponFirePath);
    console.log(this.couponsList);
  }

  deleteCoupon(event: Event, couponID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`${CouponFirePath}/${couponID}`);
      this.toastr.success('Coupon Deleted', 'Success!');
    }
    return;
  }
  callServiceToCopy(code: string) {
    this._clipboardService.copyFromContent(code);
  }
}
