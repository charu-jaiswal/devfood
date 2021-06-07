import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { MultiLanguageFirePath, AdminSettingFirePath } from '../../../firestore.path';
import * as _ from 'lodash';
import { langList } from '../language.model';

@Component({
  selector: 'multi-lang-setting-form',
  templateUrl: './multi-lang-setting.component.html',
  styleUrls: ['./multi-lang-setting.component.css'],
})
export class MultiLangSettingFormComponent implements OnInit {
  isMultiLangEnabled = true;
  multiLangSettingForm: any = {
    language: [],
  };
  langList = _.map(langList, (lang: any) => {
    return {
      ...lang,
      fullLabel: lang.name + ' - '+ lang.nativeName
    };
  });

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe = this.fireDB.doc$(`${MultiLanguageFirePath}`).subscribe((multiLangSettingData: any) => {
      this.multiLangSettingForm = multiLangSettingData;
      FbDbSubscribe.unsubscribe();
    });
    const FbDbSubscribe0 = this.fireDB.doc$(`${AdminSettingFirePath}`).subscribe((adminSettingData: any) => {
      if (adminSettingData && adminSettingData.isMultiLang) {
        this.isMultiLangEnabled = adminSettingData.isMultiLang;
      } else {
        this.isMultiLangEnabled = false;
      }
      FbDbSubscribe0.unsubscribe();
    });
  }

  saveMultiLangSetting(multiLangSetting: any) {
    if (!multiLangSetting.invalid) {
      this.fireDB.set(MultiLanguageFirePath, multiLangSetting.form.value);
      this.toastr.success('Multi Language Settings Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(multiLangSetting.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }
}
