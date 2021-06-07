import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { FirestoreService } from '../../../../core/firestore.service';
import { WalletFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { Wallet } from '../wallet.model';

@Component({
  selector: 'bsetting-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.css'],
})
export class WalletFormComponent implements OnInit {
  wallet: any;
  langList: any;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.fireDB.doc$(`${WalletFirePath}`).subscribe((walletData: any) => {
      this.wallet = walletData || {};
    });
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.wallet.lang = this.wallet.lang || {
            name: {
              name: 'Name',
              lList: []
            },
          };
          _.forIn(this.wallet.lang, (langField) => {
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

  addWallet(walletForm: any) {
    if (!walletForm.invalid) {
      if (walletForm.form.value.lang) {
        _.forIn(walletForm.form.value.lang, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      this.fireDB.set(WalletFirePath, walletForm.form.value);
      this.toastr.success('Wallet Updated', 'Success!');
      // if (walletForm.form.value.login.pin === walletForm.form.value.login.rePass) {
      //   this.fireDB.set(WalletFirePath, walletForm.form.value);
      //   this.toastr.success('Wallet Updated', 'Success!');
      // } else {
      //   this.toastr.error('Password Mismatch.', 'Error!');
      // }
    } else {
      this.fireDB.validateAllFormFields(walletForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
