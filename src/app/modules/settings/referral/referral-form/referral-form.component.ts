import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { FirestoreService } from '../../../../core/firestore.service';
import { ReferralFirePath, CouponFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { Referral } from '../referral.model';

@Component({
  selector: 'bsetting-referral-form',
  templateUrl: './referral-form.component.html',
  styleUrls: ['./referral-form.component.css'],
})
export class ReferralFormComponent implements OnInit {
  referral: any;
  couponList: any;
  langList: any;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe1 = this.fireDB.colWithIds$(`${CouponFirePath}`).subscribe((couponData) => {
      this.couponList = couponData;
      FbDbSubscribe1.unsubscribe();
    });
    const FbDbSubscribe2 = this.fireDB.doc$(`${ReferralFirePath}`).subscribe((referralData: any) => {
      this.referral = referralData || {};
      FbDbSubscribe2.unsubscribe();
    });
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.referral.lang = this.referral.lang || {
            name: {
              name: 'Name',
              lList: []
            },
            shareTitle: {
              name: 'Share Title',
              lList: []
            },
            shareBody: {
              name: 'Share Body',
              lList: []
            },
          };
          _.forIn(this.referral.lang, (langField) => {
            _.forEach(this.langList, (lang) => {
              if (!_.find(langField.lList, { id: lang.code })) {
                langField.lList.push({
                  id: lang.code,
                  val: '',
                });
              }
            });
          });
        }
        FbDbSubscribe0.unsubscribe();
      });
  }

  addReferral(referralForm: any) {
    if (!referralForm.invalid) {
      if (referralForm.form.value.lang) {
        _.forIn(referralForm.form.value.lang, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      this.fireDB.set(ReferralFirePath, referralForm.form.value);
      this.toastr.success('Referral Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(referralForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
