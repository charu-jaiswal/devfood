import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { FilterLangFirePath, GlobalSettingFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { FilterLang } from '../filter-lang.model';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'bsetting-filter-lang',
  templateUrl: './filter-lang.component.html',
  styleUrls: ['./filter-lang.component.css'],
})
export class FilterLangFormComponent implements OnInit {
  filterLang: any;
  globalSetting: any;
  langList: any;
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  async ngOnInit() {
    const filterLangObser = this.fireDB.doc$(`${FilterLangFirePath}`).pipe(take(1));
    const globalSettingObser = this.fireDB.doc$(`${GlobalSettingFirePath}`).pipe(take(1));
    const multiLangObser = this.fireDB.doc$(`${MultiLanguageFirePath}`).pipe(take(1));
    const [filterLangData, globalSettingData, multiLangData] = await forkJoin(filterLangObser, globalSettingObser, multiLangObser).toPromise();
    this.filterLang = filterLangData || {
      cuisines: [],
      uomList: [],
      outletFilter: [],
    };
    if (!this.filterLang.uomList) {
      this.filterLang.uomList = [];
    }
    this.langList = _.get(multiLangData, 'languages', []);
    const globalCuisines = _.get(globalSettingData, 'general.cuisines', []);
    const globalUomList = _.get(globalSettingData, 'general.uomList', []);
    const globalOutletFilter = _.get(globalSettingData, 'general.outletFilter', []);
    const existingCuisines = _.map(_.get(this.filterLang, 'cuisines', []), 'name');
    const existingUomList = _.map(_.get(this.filterLang, 'uomList', []), 'name');
    const existingOutletFilter = _.map(_.get(this.filterLang, 'outletFilter', []), 'name');
    const removeCuisines = _.difference(existingCuisines, globalCuisines);
    const addCuisines = _.difference(globalCuisines, existingCuisines);
    _.forEach(addCuisines, (cuisine) => this.filterLang.cuisines.push({name: cuisine}));
    _.forEach(removeCuisines, (cuisine) => _.remove(this.filterLang.cuisines, {name: cuisine}));
    const removeUomList = _.difference(existingUomList, globalUomList);
    const addUomList = _.difference(globalUomList, existingUomList);
    _.forEach(addUomList, (uomList) => this.filterLang.uomList.push({name: uomList}));
    _.forEach(removeUomList, (uomList) => _.remove(this.filterLang.uomList, {name: uomList}));
    const removeOutletFilter = _.difference(existingOutletFilter, globalOutletFilter);
    const addOutletFilter = _.difference(globalOutletFilter, existingOutletFilter);
    _.forEach(addOutletFilter, (outletFilter) => this.filterLang.outletFilter.push({name: outletFilter}));
    _.forEach(removeOutletFilter, (outletFilter) => _.remove(this.filterLang.outletFilter, {name: outletFilter}));
    if (this.langList && this.langList.length) {
      _.forEach(this.filterLang.cuisines, (langField) => {
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
      _.forEach(this.filterLang.uomList, (langField) => {
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
      _.forEach(this.filterLang.outletFilter, (langField) => {
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
  }

  addFilterLang(filterLangForm: any) {
    if (!filterLangForm.invalid) {
      filterLangForm.form.value.cuisines = _.toArray(filterLangForm.form.value.cuisines);
      filterLangForm.form.value.uomList = _.toArray(filterLangForm.form.value.uomList);
      filterLangForm.form.value.outletFilter = _.toArray(filterLangForm.form.value.outletFilter);
      _.forEach(filterLangForm.form.value.cuisines, (langField) => {
        langField.lList = _.toArray(langField.lList);
      });
      _.forEach(filterLangForm.form.value.uomList, (langField) => {
        langField.lList = _.toArray(langField.lList);
      });
      _.forEach(filterLangForm.form.value.outletFilter, (langField) => {
        langField.lList = _.toArray(langField.lList);
      });
      this.fireDB.set(FilterLangFirePath, filterLangForm.form.value);
      this.toastr.success('Settings Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(filterLangForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
