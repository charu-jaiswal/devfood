import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toArray, merge } from 'lodash';
import { FirestoreService } from '../../../../core/firestore.service';
import { LanguageFirePath } from '../../../firestore.path';
import { Language, defaultLang } from '../language.model';

@Component({
  selector: 'brand-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.css'],
})
export class LanguageFormComponent implements OnInit {
  language: Language;
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe = this.fireDB.doc$(`${LanguageFirePath}`).subscribe((languageData: any) => {
      if (languageData) {
        this.language = merge(defaultLang, languageData);
      } else {
        this.language = defaultLang;
      }
      FbDbSubscribe.unsubscribe();
    });
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
      this.fireDB.set(LanguageFirePath, languageForm.form.value);
      this.toastr.success('Language Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(languageForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
