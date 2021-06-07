import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { toArray } from 'lodash';
import * as _ from 'lodash';
import { FirestoreService } from '../../../../core/firestore.service';
import { AuthService, User } from '../../../../core/auth.service';
import { GlobalSettingFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { GlobalSetting, SelectFormVal, curSymPlcList, decSepList, timeIntList, DeliverySetup  } from '../global-setting.model';

@Component({
  selector: 'brand-global-setting-form',
  templateUrl: './global-setting-form.component.html',
  styleUrls: ['./global-setting-form.component.css'],
})
export class GlobalSettingFormComponent implements OnInit {
  deliverySetup: DeliverySetup;
  globalSetting: any;
  currencyList: any;
  currencySymbolPlacementList: SelectFormVal;
  decimalSeparatorList: SelectFormVal;
  user: User | null;
  timezones?: SelectFormVal;
  timeInterval?: SelectFormVal;
  langList: any;

  constructor(public fireDB: FirestoreService,
    private afs: AngularFirestore,
    private router: Router,
    public auth: AuthService,
    private route: ActivatedRoute,
    public toastr: ToastrService) {
    this.user = this.auth.userDetail;
  }

  ngOnInit() {
    this.timeInterval = timeIntList;
    const FbDbSubscribe1 = this.fireDB.docRoot$(`global/timezone`).subscribe((timezoneData: any) => {
      this.timezones = timezoneData.timezone;
      FbDbSubscribe1.unsubscribe();
    });
    const FbDbSubscribe2 = this.fireDB.docRoot$(`global/currency`).subscribe((currencyData: any) => {
      this.currencyList = currencyData.currency;
      FbDbSubscribe2.unsubscribe();
    });
    this.currencySymbolPlacementList = curSymPlcList;
    this.decimalSeparatorList = decSepList;
    const FbDbSubscribe3 = this.fireDB.doc$(`${GlobalSettingFirePath}`).subscribe((globalSettingData: any) => {
      this.globalSetting = globalSettingData;
      FbDbSubscribe3.unsubscribe();
    });
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          _.forEach(this.globalSetting.links, (langField) => {
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
        }
        FbDbSubscribe0.unsubscribe();
      });
  }

  compareByOptionCode(firstOption: any, secondOption: any) {
    return firstOption && secondOption && firstOption.code === secondOption.code;
  }

  addGlobalSetting(globalSettingForm: any) {
    // console.log(globalSettingForm);
    if (!globalSettingForm.invalid) {
      if (globalSettingForm.form.value.links) {
        globalSettingForm.form.value.links = toArray(globalSettingForm.form.value.links);
        _.forEach(globalSettingForm.form.value.links, (langField) => {
          langField.lList = toArray(langField.lList);
        });
      }
      if (globalSettingForm.form.value.itemIcons) {
        globalSettingForm.form.value.itemIcons = toArray(globalSettingForm.form.value.itemIcons);
      }
      this.fireDB.set(GlobalSettingFirePath, globalSettingForm.form.value);
      this.toastr.success('Global Settings Updated', 'Success!');
      if (this.user && !this.user.globalSetup) {
        this.afs.doc(`admin/${this.user.uid}`).update({
          globalSetup: true,
        });
        this.router.navigate(['/reports/main']);
      }
    } else {
      this.fireDB.validateAllFormFields(globalSettingForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

  addTag(tagName: string) {
    return tagName;
  }
  addCuisine(cuisineName: string) {
    return cuisineName;
  }
  addCity(cityName: string) {
    return cityName;
  }
  addFilter(filterName: string) {
    return filterName;
  }
  addUomList(uomName: string) {
    return uomName;
  }

  addMoreAppLinks() {
    if (this.globalSetting) {
      this.globalSetting.links = this.globalSetting.links || [];
      const newLink: any = {
        title: '',
        icon: 'link',
        url: '',
        lList: [],
      };
      _.forEach(this.langList, (lang) => {
        newLink.lList.push({
          id: lang.code,
          val: '',
        });
      });
      this.globalSetting.links.push(newLink);
    }
  }

  deleteAppLink(i: number) {
    if (this.globalSetting && this.globalSetting.links) {
      this.globalSetting.links.splice(i, 1);
    }
  }
  
  addMoreItemIcons() {
    if (this.globalSetting) {
      this.globalSetting.itemIcons = this.globalSetting.itemIcons || [];
      const newLink: any = {
        title: '',
        url: '',
      };
      this.globalSetting.itemIcons.push(newLink);
    }
  }

  deleteItemIcon(i: number) {
    if (this.globalSetting && this.globalSetting.itemIcons) {
      this.globalSetting.itemIcons.splice(i, 1);
    }
  }
}
