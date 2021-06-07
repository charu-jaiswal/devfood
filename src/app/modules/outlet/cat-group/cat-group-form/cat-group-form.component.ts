import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toArray } from 'lodash';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { CatGroupFirePath, CategoryFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { CatGroup } from '../cat-group.model';

@Component({
  selector: 'outlet-cat-group-form',
  templateUrl: './cat-group-form.component.html',
  styleUrls: ['./cat-group-form.component.css'],
})
export class CatGroupFormComponent implements OnInit {
  catGroupID: string | null;
  outletID: string | null;
  catGroup: any;
  categoryList: any;
  langList: any;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.paramMap.get('outletid');
    const FbDbSubscribe1 = this.fireDB.colWithIds$(`outlets/${this.outletID}/${CategoryFirePath}`).subscribe((categoryListData) => {
      this.categoryList = categoryListData;
      FbDbSubscribe1.unsubscribe();
    });
    this.catGroupID = this.route.snapshot.paramMap.get('id');
    if (this.catGroupID) {
      const FbDbSubscribe2 = this.fireDB.doc$(`outlets/${this.outletID}/${CatGroupFirePath}/${this.catGroupID}`).subscribe((catGroupData: any) => {
        this.catGroup = catGroupData;
        FbDbSubscribe2.unsubscribe();
      });
    } else {
      this.catGroup = {};
    }
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.catGroup.lang = this.catGroup.lang || {
            name: {
              name: 'Name',
              lList: []
            },
            desc: {
              name: 'Description',
              lList: []
            },
          };
          _.forIn(this.catGroup.lang, (langField) => {
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


  addCatGroup(catGroupForm: any) {
    const value = catGroupForm.form.value.name;
    if (!catGroupForm.invalid) {
      if (catGroupForm.form.value.lang) {
        _.forIn(catGroupForm.form.value.lang, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      if (this.catGroupID) {
        this.fireDB.set(`outlets/${this.outletID}/${CatGroupFirePath}/${this.catGroupID}`, catGroupForm.form.value);
        this.toastr.success('Category Group Updated', 'Success!');
      } else {
        this.fireDB.add(`outlets/${this.outletID}/${CatGroupFirePath}`, catGroupForm.form.value);
        this.toastr.success('Category Group Created', 'Success!');
      }
      this.router.navigate(['../..'], { relativeTo: this.route });
    } else {
      this.fireDB.validateAllFormFields(catGroupForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
