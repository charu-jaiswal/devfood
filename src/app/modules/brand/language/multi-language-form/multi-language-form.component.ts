import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toArray, merge } from 'lodash';
import { FirestoreService } from '../../../../core/firestore.service';
import { MultiLanguageFirePath } from '../../../firestore.path';
import { Language, defaultLang } from '../language.model';

@Component({
  selector: 'brand-multi-language-form',
  templateUrl: './multi-language-form.component.html',
  styleUrls: ['./multi-language-form.component.css'],
})
export class MultiLanguageFormComponent implements OnInit {
  langID: string | null;
  language: Language;
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.langID = this.route.snapshot.paramMap.get('id');
    if (this.langID) {
      const FbDbSubscribe = this.fireDB.doc$(`${MultiLanguageFirePath}/customer/${this.langID}`).subscribe((languageData: any) => {
        if (languageData) {
          this.language = merge(defaultLang, languageData);
        } else {
          this.language = defaultLang;
        }
        FbDbSubscribe.unsubscribe();
      });
    }
  }

  addLanguage(languageForm: any) {
    if (!languageForm.invalid) {
      if (languageForm.form.value.lang) {
        languageForm.form.value.lang = toArray(languageForm.form.value.lang);
        languageForm.form.value.lang.map((category: any) => {
          category.words = toArray(category.words);
          return category;
        });
      }
      this.fireDB.set(`${MultiLanguageFirePath}/customer/${this.langID}`, languageForm.form.value);
      this.toastr.success('Language Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(languageForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
