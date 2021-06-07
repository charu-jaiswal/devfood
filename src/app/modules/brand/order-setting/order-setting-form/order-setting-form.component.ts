import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { OrderSettingFirePath } from '../../../firestore.path';
import { OrderSetting } from '../order-setting.model';
import { SelectFormVal, RefundList } from '../order-setting.model';

@Component({
  selector: 'brand-order-setting-form',
  templateUrl: './order-setting-form.component.html',
  styleUrls: ['./order-setting-form.component.css'],
})
export class OrderSettingFormComponent implements OnInit {
  orderSetting: OrderSetting;
  refundList?: SelectFormVal;
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.refundList = RefundList;
    const FbDbSubscribe = this.fireDB.doc$(`${OrderSettingFirePath}`).subscribe((orderSettingData: OrderSetting) => {
      this.orderSetting = orderSettingData;
      FbDbSubscribe.unsubscribe();
    });
  }
  addVoid(tagName: string) {
    return tagName;
  }
  addComp(tagName: string) {
    return tagName;
  }
  addRefund(tagName: string) {
    return tagName;
  }
  addOrderSetting(orderSettingForm: any) {
    if (!orderSettingForm.invalid) {
      this.fireDB.set(OrderSettingFirePath, orderSettingForm.form.value);
      this.toastr.success('Order Setting Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(orderSettingForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
