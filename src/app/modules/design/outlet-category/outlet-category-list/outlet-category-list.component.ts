import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { OutletCateFirePath } from '../../../firestore.path';
import { OutletCategory } from '../outlet-category.model';
import * as _ from 'lodash';

@Component({
  selector: 'brand-outlet-category-list',
  templateUrl: './outlet-category-list.component.html',
  styleUrls: ['./outlet-category-list.component.css'],
})
export class OutletCategoryListComponent implements OnInit {
  OutletCategoryList: OutletCategory[];

  constructor(public fireDB: FirestoreService, public toastr: ToastrService) { }

  ngOnInit() {
    this.fireDB.colWithIds$(OutletCateFirePath).subscribe((response) => {
      this.OutletCategoryList = _.orderBy(response, ['isDisabled', 'sort', 'name'], ['asc', 'desc', 'asc']);
    });
  }

  deleteOutletCategory(event: Event, OutletCategoryID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`${OutletCateFirePath}/${OutletCategoryID}`);
      this.toastr.success('Outlet Category Deleted', 'Success!');
    }
    return;
  }

  disableOutletCate(event: Event, outletCate: any) {
    let confirmDisable;
    if (!outletCate.isDisabled) {
      confirmDisable = confirm('are you sure you want to disble?');
    } else {
      confirmDisable = confirm('are you sure you want to enable?');
    }
    if (confirmDisable) {
      this.fireDB
        .update(`${OutletCateFirePath}/${outletCate.id}`, {
          isDisabled: !outletCate.isDisabled,
        })
        .then(() => {
          if (!outletCate.isDisabled) {
            this.toastr.success('Outlet Disabled', 'Success!');
          } else {
            this.toastr.success('Outlet Enabled', 'Success!');
          }
        })
        .catch((err: any) => {
          this.toastr.error(err, 'Error!');
        });
    }
  }

}
