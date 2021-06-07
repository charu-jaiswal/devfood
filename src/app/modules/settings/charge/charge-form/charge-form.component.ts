import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { FirestoreService } from '../../../../core/firestore.service';
import { ChargeFirePath, TaxFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { Charge } from '../charge.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'bsetting-charge-form',
  templateUrl: './charge-form.component.html',
  styleUrls: ['./charge-form.component.css'],
})
export class ChargeFormComponent implements OnInit {
  chargeID: string | null;
  charge: any;
  outletList: any;
  apply: boolean;
  taxList: any[];
  langList: any;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.fireDB.colWithIds$(TaxFirePath).subscribe((response: any) => {
      this.taxList = response;
      // console.log(response);
    });
    const FbDbSubscribe1 = this.fireDB.colWithIds$(`outlets`).subscribe((outletData) => {
      this.outletList = outletData;
      FbDbSubscribe1.unsubscribe();
    });
    this.chargeID = this.route.snapshot.paramMap.get('id');
    if (this.chargeID) {
      const FbDbSubscribe2 = this.fireDB.doc$(`${ChargeFirePath}/${this.chargeID}`).subscribe((chargeData: any) => {
        this.charge = chargeData;
        FbDbSubscribe2.unsubscribe();
      });
    } else {
      this.apply = true;
      this.charge = {};
    }
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.charge.lang = this.charge.lang || {
            dispName: {
              name: 'Display Name',
              lList: []
            },
          };
          _.forIn(this.charge.lang, (langField) => {
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

  addCharge(chargeForm: any) {
    // console.log(chargeForm);
    if (!chargeForm.invalid) {
      if (chargeForm.form.value.lang) {
        _.forIn(chargeForm.form.value.lang, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      if (this.chargeID) {
        this.fireDB.set(`${ChargeFirePath}/${this.chargeID}`, chargeForm.form.value);
        this.toastr.success('Charge Updated', 'Success!');
      } else {
        this.fireDB.add(ChargeFirePath, chargeForm.form.value);
        this.toastr.success('Charge Created', 'Success!');
      }
      this.router.navigate(['/settings/charge/list']);
    } else {
      this.fireDB.validateAllFormFields(chargeForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
