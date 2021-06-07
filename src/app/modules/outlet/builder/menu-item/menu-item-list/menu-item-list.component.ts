import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { groupBy, keyBy, merge, mapValues, toArray } from 'lodash';
import { FirestoreService } from '../../../../../core/firestore.service';
import { MenuItemFirePath, CategoryFirePath, AdminSettingFirePath } from '../../../../firestore.path';
import { MenuItem } from '../menu-item.model';
import { Category } from '../../category/category.model';
import { LocalStorage } from 'ngx-store';
import * as _ from 'lodash';
import * as firebase from 'firebase/app';

@Component({
  selector: 'outlet-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.css'],
})
export class MenuItemListComponent implements OnInit, OnChanges {
  // @LocalStorage() storageCategorySelected: any;
  selCatID: string;
  outletID: string | null;
  menuItemList: Observable<MenuItem[]>;
  menuItemListData: MenuItem[];
  categoryListData: any;
  finalListData: any = [];
  loading: boolean = false;
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


  @Input() 
  set categorySelected(catID: any) {
    if (catID) {
      this.loading = true;
      this.fireDB.colWithIds$(`outlets/${this.outletID}/${MenuItemFirePath}`, (ref: any) => ref.where('category', '==', catID)).subscribe((menuItemsData: MenuItem[]) => {
        this.loading = false;
        this.selCatID = catID;
        this.finalListData = _.orderBy(menuItemsData, ['display.sort', 'name'], ['desc', 'asc']);
         console.log("this.finalListData",this.finalListData);
         
        // this.parseInitData('init');
      });
    }
  };

  ngOnChanges() {
    // if (this.storageCategorySelected !== this.categorySelected && this.categorySelected !== undefined) {
    //   this.storageCategorySelected = this.categorySelected;
    //   if (this.menuItemListData.length > 0) {
    //     this.parseInitData('onchange');
    //   }
    // }
  }

  async ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 2].snapshot.paramMap.get('outletid');
    // await this.fireDB.colWithIds$(`outlets/${this.outletID}/${CategoryFirePath}`).subscribe((categoryData: Category[]) => {
    //   this.categoryListData = keyBy(categoryData, 'id');
    //   this.parseInitData('init');
    // });
    this.fireDB.doc$(AdminSettingFirePath).subscribe((adminConf: any) => {
      this.deletePassCode = adminConf.deletePassCode;
    });
  }

  // parseInitData(type: any) {
  //   const categoryWise = _.groupBy(this.menuItemListData, 'category');
  //   this.finalListData = _.toArray(_.merge({}, this.categoryListData, _.mapValues(categoryWise, (value) => ({ value }))));
  //   this.finalListData = _.orderBy(this.finalListData, 'sort', 'desc');
  // }

  deleteMenuItem(event: Event, menuItemID: string) {
    if (this.deletePassCode) {
      const userEnterPass = window.prompt('Please enter the Password for deletion ?');
      if (userEnterPass == this.deletePassCode) {
        this.fireDB.delete(`outlets/${this.outletID}/${MenuItemFirePath}/${menuItemID}`);
        this.toastr.success('Menu Item Deleted', 'Success!');
      } else {
        this.toastr.error('Wrong Password', 'Error!');
      }
      return;
    }
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`outlets/${this.outletID}/${MenuItemFirePath}/${menuItemID}`);
      this.toastr.success('Menu Item Deleted', 'Success!');
    }
    return;
  }

  disableMenuItem(event: Event, menuItem: any) {
    const response = confirm('are you sure you want to disable?');
    if (response) {
      this.fireDB.update(`outlets/${this.outletID}/${MenuItemFirePath}/${menuItem.id}`, {
        isDisabled: !menuItem.isDisabled,
      });
      if (!menuItem.isDisabled) {
        this.toastr.success('Menu Item Disabled', 'Success!');
      } else {
        this.toastr.success('Menu Item Enabled', 'Success!');
      }
    }
    return;
  }

  copyMenuItem(name: string, outlet: any) {
    console.log(name, outlet);
    const data = {...outlet};
    const tmp = name.split(' - ');
    if (tmp[1] === undefined) {
      data.name = `${name} - (Copy)`;
    } else {
      if (tmp[2] === undefined) {
        data.name = `${name} - (1)`;
      } else {
        const index = parseInt(tmp[2].split('')[1], 10) + 1;
        const newname = `${tmp[0]} - ${tmp[1]} - (${index})`;
        data.name = newname;
      }
    }
    const old_id = data['id'];
    delete data['id'];

    if (this.finalListData && !this.checkName(this.finalListData, data.name)) {
      this.copyMenuItem(data.name, outlet);
    } else {
      const conf = confirm(`Are you want to duplicate ${outlet.name}?`);
      if (conf) {
        this.fireDB.col(`outlets/${this.outletID}/${MenuItemFirePath}`).add(data);
      }
    }
  }

  checkName(list: any, name: String) {
    for (let k = 0; k < list.length; k++) {
      const element = list[k];
      if (name === element.name) {
        return false;
      }
    }
    return true;
  }

}
