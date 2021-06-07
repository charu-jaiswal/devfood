import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../core/firestore.service';
import { BillingUsagePath, AdminSettingFirePath } from '../../firestore.path';
import * as _ from 'lodash';

@Component({
  selector: 'brand-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent implements OnInit {
  billUsageList: any;
  adminConfData: any;
  computeUsageList: any = [];
  monthList = [ "", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(public fireDB: FirestoreService, public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe1 = this.fireDB.colWithIds$(BillingUsagePath).subscribe((billUsageData: any) => {
      this.billUsageList = billUsageData;
      this.updateBillList();
    });
    const FbDbSubscribe0 = this.fireDB.doc$(`${AdminSettingFirePath}`).subscribe((adminSettingData: any) => {
      this.adminConfData = adminSettingData;
      this.updateBillList();
      FbDbSubscribe0.unsubscribe();
    });
  }

  getCustomerURLComp() {
    return (
      'name='+encodeURIComponent(_.get(this.adminConfData, 'billing.cusName', '')) + '&' +
      'phone='+(_.get(this.adminConfData, 'billing.cusPhone', '')) + '&' +
      'email='+(_.get(this.adminConfData, 'billing.cusEmail', ''))
    );
  }

  updateBillList() {
    if (this.billUsageList && this.adminConfData) {
      this.computeUsageList = [];
       console.log(this.billUsageList);
      const newList: any = [];
      _.forEach(this.billUsageList, (usageData) => {
        const usageAmount = (_.get(usageData, 'userCount', 0) * _.get(this.adminConfData, 'billing.smsCost', 0));
        console.log("usageAmount",usageAmount);
        
        const remainAmount = usageAmount - _.get(usageData, 'paid', 0);
        newList.push({
          id: _.get(usageData, 'id', ''),
          monthName: this.monthList[usageData.id.split('-')[1]] + ', ' + usageData.id.split('-')[0],
          orderCount: _.get(usageData, 'orderCount', 0),
          userCount: _.get(usageData, 'userCount', 0),
          usageAmount: usageAmount,
          paidAmount: _.get(usageData, 'paid', 0),
          remainAmount: remainAmount,
          remainAmountPlus: -remainAmount,
          done: _.get(usageData, 'done', false),
        });
        this.computeUsageList = _.orderBy(newList, 'id', 'desc')
      })
    }
  }

}
