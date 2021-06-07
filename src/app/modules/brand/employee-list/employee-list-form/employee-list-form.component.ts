import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { EmployeeFormFirePath, EmployeeListFirePath, AdminSettingFirePath } from '../../../firestore.path';
import { Papa } from 'ngx-papaparse';
import { map, take } from 'rxjs/operators';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'brand-employee-list-form',
  templateUrl: './employee-list-form.component.html',
  styleUrls: ['./employee-list-form.component.css'],
})
export class EmployeeListFormComponent implements OnInit {
  employeeList: any;
  rewardConv = 1;
  csvFile: File | null;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private papa: Papa,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe = this.fireDB.doc$(`${EmployeeFormFirePath}`).subscribe((employeeListData: any) => {
      this.employeeList = employeeListData;
      FbDbSubscribe.unsubscribe();
    });
    const FbDbSubscribe1 = this.fireDB.doc$(`${AdminSettingFirePath}`).subscribe((adminConfData: any) => {
      this.rewardConv = _.get(adminConfData, 'rewardConv', 1);
      FbDbSubscribe1.unsubscribe();
    });
  }

  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === 'csv') {
        this.toastr.info('File uploading..', 'Wait!');
        this.csvFile = event.target.files[0];
      }
    }
  }

  addEmployeeListForm(employeeListForm: any) {
    if (!employeeListForm.invalid) {
      if (this.csvFile) {
        this.papa.parse(this.csvFile, {
          delimiter: ",",
          skipEmptyLines: true,
          complete: async (result: any) => {
            if (result.data) {
              await this.fireDB.deleteCollectionByEndDate(EmployeeListFirePath, moment().subtract(31, 'days').valueOf());
              _.forEach(result.data, async (employee, index: number) => {
                console.log(employee[0]);
                console.log(employee[19]);
                console.log(employee[12]);
                if (employee[0] && moment(employee[0]).isValid() && employee[19] && employee[12]) {
                  const existPosOrder: any = await this.fireDB.doc$(EmployeeListFirePath + '/' + employee[19]).pipe(take(1)).toPromise();
                  console.log(existPosOrder);
                  if (existPosOrder) {
                    if (existPosOrder.past && existPosOrder.id && existPosOrder.uid && existPosOrder.total && existPosOrder.rewardTotal) {
                      // if (existPosOrder.total == parseFloat(employee[12])) {
                        const rewardTotal = parseFloat(employee[12]) * this.rewardConv;
                        this.fireDB.col('users/' + existPosOrder.uid + '/reward').add({
                          amount: rewardTotal,
                          type: "bill_reward",
                          time: (new Date()),
                          orderID: existPosOrder.id,
                        });
                        const existUser = await this.fireDB.doc$('users/' + existPosOrder.uid).pipe(take(1)).toPromise();
                        console.log(existUser);
                        this.fireDB.doc('users/' + existPosOrder.uid).update({ 'reward':  (_.get(existUser, 'reward', 0) + existPosOrder.rewardTotal) });
                        this.fireDB.doc(EmployeeListFirePath + '/' + existPosOrder.id).update({ 'redeemed': true });
                      // } else {
                      //   this.fireDB.doc(EmployeeListFirePath + '/' + existPosOrder.id).update({ 'incorrect': true });
                      // }
                    } else {
                      this.fireDB.doc(EmployeeListFirePath + '/' + existPosOrder.id).update({ 'invalid': true });
                    }
                  } else {
                    this.fireDB.doc(EmployeeListFirePath + '/' + employee[19]).set({
                      id: employee[19],
                      date: moment(employee[0]).toDate(),
                      timestamp: moment(employee[0]).valueOf(),
                      total: parseFloat(employee[12]),
                    })
                  }
                }
              })
            }
          }
        });
      }
      const employeeListFormData = employeeListForm.form.value;
      employeeListFormData.updated = new Date();
      this.fireDB.set(EmployeeFormFirePath, employeeListFormData);
      // this.toastr.success('Employee List Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(employeeListForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
