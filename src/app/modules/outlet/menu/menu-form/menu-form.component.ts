import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toArray, get } from 'lodash';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { MenuFirePath, CategoryFirePath, CatGroupFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { Menu, SelectFormVal, dayList } from '../menu.model';

@Component({
  selector: 'outlet-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css'],
})
export class MenuFormComponent implements OnInit {
  menuID: string | null;
  outletID: string | null;
  outletData: any;
  isCategory: boolean = false;
  menu: any;
  categoryList: any;
  catGroupList: any;
  dayList: SelectFormVal;
  langList: any;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.dayList = dayList;
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.paramMap.get('outletid');
    
    const FbDbSubscribe = this.fireDB.doc$(`outlets/${this.outletID}`).subscribe((outletData) => {
      this.outletData = outletData;
      this.isCategory = get(outletData, 'isCategory', false);
      FbDbSubscribe.unsubscribe();
    });
    const FbDbSubscribe1 = this.fireDB.colWithIds$(`outlets/${this.outletID}/${CategoryFirePath}`).subscribe((categoryListData) => {
      this.categoryList = categoryListData;
      FbDbSubscribe1.unsubscribe();
    });
    this.menuID = this.route.snapshot.paramMap.get('id');
    if (this.menuID) {
      const FbDbSubscribe2 = this.fireDB.doc$(`outlets/${this.outletID}/${MenuFirePath}/${this.menuID}`).subscribe((menuData: any) => {
        this.menu = menuData;
        FbDbSubscribe2.unsubscribe();
      });
    } else {
      this.menu = {};
    }
    const FbDbSubscribe3 = this.fireDB.colWithIds$(`outlets/${this.outletID}/${CatGroupFirePath}`).subscribe((catGroupListData) => {
      this.catGroupList = catGroupListData;
      FbDbSubscribe3.unsubscribe();
    });
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.menu.lang = this.menu.lang || {
            name: {
              name: 'Name',
              lList: []
            },
            desc: {
              name: 'Description',
              lList: []
            },
          };
          _.forIn(this.menu.lang, (langField) => {
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

  addMoreOperatingHours() {
    if (this.menu) {
      this.menu.opHrs = this.menu.opHrs || [];
      this.menu.opHrs.push({
        fromTime: '',
        toTime: '',
        day: '',
      });
    }
  }

  deleteOperatingHour(i: number) {
    if (this.menu && this.menu.opHrs) {
      this.menu.opHrs.splice(i, 1);
    }
  }

  addMenu(menuForm: any) {
    const value = menuForm.form.value.name;
    if (!menuForm.invalid) {
      if (menuForm.form.value.opHrs) {
        menuForm.form.value.opHrs = toArray(menuForm.form.value.opHrs);
      }
      if (menuForm.form.value.lang) {
        _.forIn(menuForm.form.value.lang, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      if (this.menuID) {
        this.fireDB.set(`outlets/${this.outletID}/${MenuFirePath}/${this.menuID}`, menuForm.form.value);
        this.toastr.success('Menu Updated', 'Success!');
      } else {
        this.fireDB.add(`outlets/${this.outletID}/${MenuFirePath}`, menuForm.form.value);
        this.toastr.success('Menu Created', 'Success!');
      }
      this.router.navigate(['../..'], { relativeTo: this.route });
    } else {
      this.fireDB.validateAllFormFields(menuForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
