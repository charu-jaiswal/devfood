import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toArray } from 'lodash';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../../core/firestore.service';
import { AddonFirePath, MultiLanguageFirePath } from '../../../../firestore.path';
import { Addon } from '../addon.model';

@Component({
  selector: 'outlet-addon-form',
  templateUrl: './addon-form.component.html',
  styleUrls: ['./addon-form.component.css'],
})
export class AddonFormComponent implements OnInit {
  addonID: string | null;
  outletID: string | null;
  addon: any;
  keyIngredients: any;
  langList: any;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.paramMap.get('outletid');
    this.addonID = this.route.snapshot.paramMap.get('id');
    if (this.addonID) {
      const FbDbSubscribe2 = this.fireDB.doc$(`outlets/${this.outletID}/${AddonFirePath}/${this.addonID}`).subscribe((addonData: any) => {
        if (addonData.item) {
          addonData.item = toArray(addonData.item);
          _.forEach(addonData.item, (langField) => {
            if (langField.lList && !_.isArray(langField.lList)) {
              delete langField.lList;
            }
          });
        } 
        this.addon = addonData;
        FbDbSubscribe2.unsubscribe();
      });
    } else {
      this.addon = {};
    }
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.addon.lang = this.addon.lang || {
            name: {
              name: 'Name',
              lList: []
            },
            desc: {
              name: 'Desc',
              lList: []
            },
          };
          _.forIn(this.addon.lang, (langField) => {
            _.forEach(this.langList, (lang) => {
              if (!_.find(langField.lList, { id: lang.code })) {
                langField.lList.push({
                  id: lang.code,
                  val: '',
                });
              }
            });
          });
          _.forEach(this.addon.item, (langField) => {
            _.forEach(this.langList, (lang) => {
              if (!langField.lList) {
                langField.lList = [];
              }
              if (!_.find(langField.lList, { id: lang.code })) {
                langField.lList.push({
                  id: lang.code,
                  val: '',
                });
              }
            });
          });
          console.log(this.addon);
        }
        FbDbSubscribe0.unsubscribe();
      });
  }

  addMoreRows() {
    if (this.addon) {
      this.addon.item = this.addon.item || [];
      const newItem: any = {
        name: '',
        price: 0,
        isDisable: false,
        lList: [],
      };
      _.forEach(this.langList, (lang) => {
        newItem.lList.push({
          id: lang.code,
          val: '',
        });
      });
      this.addon.item.push(newItem);
    }
  }

  deleteRow(i: number) {
    if (this.addon && this.addon.item) {
      this.addon.item.splice(i, 1);
    }
  }

  addAddon(addonForm: any) {
    const value = addonForm.form.value.name;
    if (!addonForm.invalid) {
      if (addonForm.form.value.item) {
        addonForm.form.value.item = toArray(addonForm.form.value.item);
        _.forEach(addonForm.form.value.item, (langField) => {
          langField.lList = toArray(langField.lList);
        });
      } 
      if (addonForm.form.value.lang) {
        _.forIn(addonForm.form.value.lang, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      if (this.addonID) {
        this.fireDB.set(`outlets/${this.outletID}/${AddonFirePath}/${this.addonID}`, addonForm.form.value);
        this.toastr.success('Addon Updated', 'Success!');
      } else {
        this.fireDB.add(`outlets/${this.outletID}/${AddonFirePath}`, addonForm.form.value);
        this.toastr.success('Addon Created', 'Success!');
      }
      this.router.navigate(['../../../menu-builder'], { relativeTo: this.route });
    } else {
      this.fireDB.validateAllFormFields(addonForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
