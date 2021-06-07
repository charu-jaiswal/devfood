import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { TaxFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { Tax } from '../tax.model';
import * as _ from 'lodash';

@Component({
  selector: 'bsetting-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.css'],
})
export class TaxFormComponent implements OnInit {
  taxID: string | null;
  tax: any;
  outletList: any;
  langList: any;
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe1 = this.fireDB.colWithIds$(`outlets`).subscribe((outletData) => {
      this.outletList = outletData;
      FbDbSubscribe1.unsubscribe();
    });
    this.taxID = this.route.snapshot.paramMap.get('id');
    if (this.taxID) {
      const FbDbSubscribe2 = this.fireDB.doc$(`${TaxFirePath}/${this.taxID}`).subscribe((taxData: any) => {
        this.tax = taxData;
        FbDbSubscribe2.unsubscribe();
      });
    } else {
      this.tax = {};
    }
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.tax.lang = this.tax.lang || {
            dispName: {
              name: 'Display Name',
              lList: []
            },
          };
          _.forIn(this.tax.lang, (langField) => {
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

  addTax(taxForm: any) {
    if (!taxForm.invalid) {
      if (taxForm.form.value.lang) {
        _.forIn(taxForm.form.value.lang, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      if (this.taxID) {
        this.fireDB.set(`${TaxFirePath}/${this.taxID}`, taxForm.form.value);
        this.toastr.success('Tax Updated', 'Success!');
      } else {
        this.fireDB.add(TaxFirePath, taxForm.form.value);
        this.toastr.success('Tax Created', 'Success!');
      }
      this.router.navigate(['/settings/tax/list']);
    } else {
      this.fireDB.validateAllFormFields(taxForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
