import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../../core/firestore.service';
import { CategoryFirePath, AdminSettingFirePath } from '../../../../firestore.path';
import { Category } from '../category.model';
import { LocalStorage } from 'ngx-store';
import * as _ from 'lodash';
@Component({
  selector: 'outlet-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  @LocalStorage() storageCategorySelected: any;
  @Output() onSelectItem = new EventEmitter();
  outletID: string | null;
  categoryList: Category[];
  selected: any = '';
  deletePassCode = null;

  constructor(public toastr: ToastrService, private route: ActivatedRoute, private router: Router, public fireDB: FirestoreService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url.split('/')[4] === 'menu-builder') {
          this.ngOnInit();
        }
      }
    });
  }

  ngOnInit() {
    this.selected = '';
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 2].snapshot.paramMap.get('outletid');
    this.fireDB.colWithIds$(`outlets/${this.outletID}/${CategoryFirePath}`).subscribe((response) => {
      this.categoryList = _.orderBy(response, 'name', 'asc');

      const isCatSelected = this.categoryList.some((category: any) => {
        return this.storageCategorySelected === category.id;
      });
      if (!isCatSelected) {
        this.storageCategorySelected = null;
      }
      if (!this.storageCategorySelected) {
        if (this.categoryList.length > 0) {
          this.selected = this.categoryList[0]['id'];
          this.storageCategorySelected = this.categoryList[0]['id'];
        }
      } else {
        this.selected = this.storageCategorySelected;
      }
      // console.log(this.categoryList);
      this.onSelectItem.emit(this.selected);
    });
    this.fireDB.doc$(AdminSettingFirePath).subscribe((adminConf: any) => {
      this.deletePassCode = adminConf.deletePassCode;
    });
  }

  deleteCategory(event: Event, categoryID: string) {
    if (this.deletePassCode) {
      const userEnterPass = window.prompt('Please enter the Password for deletion ?');
      if (userEnterPass == this.deletePassCode) {
        this.fireDB.delete(`outlets/${this.outletID}/${CategoryFirePath}/${categoryID}`);
        this.toastr.success('Category Deleted', 'Success!');
      } else {
        this.toastr.error('Wrong Password', 'Error!');
      }
      return;
    }
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`outlets/${this.outletID}/${CategoryFirePath}/${categoryID}`);
      this.toastr.success('Category Deleted', 'Success!');
    }
    return;
  }

  categorySelect(value: any) {
    this.storageCategorySelected = value;
    this.selected = value;
    this.onSelectItem.emit(value);
  }

}
