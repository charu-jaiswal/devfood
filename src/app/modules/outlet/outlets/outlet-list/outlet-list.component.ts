import { AuthService } from '../../../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { OutletFirePath, AdminSettingFirePath } from '../../../firestore.path';
import { Outlet } from '../outlet.model';
import { Router } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'outlets-outlet-list',
  templateUrl: './outlet-list.component.html',
  styleUrls: ['./outlet-list.component.css'],
})
export class OutletListComponent implements OnInit {
  outletList: Outlet[];
  hideAddOutlet = false;
  deletePassCode = null;
  showOutletDuplicate: boolean = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    public toastr: ToastrService,
    public fireDB: FirestoreService,
  ) {
    this.auth.user.subscribe((userData: any) => {
      if (userData) {
        if (this.auth.roleUser === 'subadmin') {
          this.router.navigate([`/outlet/dash/${userData.outletID}/menu-builder`]);
        }
      }
    });
  }

  ngOnInit() {
    this.fireDB.colWithIds$(OutletFirePath).subscribe((response: any) => {
      this.outletList = _.orderBy(response, ['isHidden', 'isDisabled', 'sort', 'name'], ['asc', 'asc', 'desc', 'asc']);
      this.fireDB.doc$(AdminSettingFirePath).subscribe((adminConf: any) => {
        this.deletePassCode = adminConf.deletePassCode;
        this.showOutletDuplicate = _.get(adminConf, 'showOutletDuplicate', false);
        if (adminConf.outletLimit && this.outletList.length > adminConf.outletLimit) {
          this.hideAddOutlet = true;
        }
      });
    });
  }

  deleteOutlet(event: Event, outletID: string) {
    if (this.deletePassCode) {
      const userEnterPass = window.prompt('Please enter the Password for deletion ?');
      if (userEnterPass == this.deletePassCode) {
        this.fireDB.delete(`${OutletFirePath}/${outletID}`);
        this.toastr.success('Outlet Deleted', 'Success!');
      } else {
        this.toastr.error('Wrong Password', 'Error!');
      }
      return;
    }
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`${OutletFirePath}/${outletID}`);
      this.toastr.success('Outlet Deleted', 'Success!');
    }
    return;
  }

  disableOutlet(event: Event, outlet: any) {
    let confirmDisable;
    if (!outlet.isDisabled) {
      confirmDisable = confirm('are you sure you want to disble?');
    } else {
      confirmDisable = confirm('are you sure you want to enable?');
    }
    if (confirmDisable) {
      this.fireDB
        .update(`${OutletFirePath}/${outlet.id}`, {
          isDisabled: !outlet.isDisabled,
        })
        .then(() => {
          if (!outlet.isDisabled) {
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

  copyOutlets(name: string, i: any, outlet: any) {
    console.log("Outlet ",name, i, outlet);
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
    data['sort'] = outlet.sort;

    if (!this.checkName(this.outletList, data.name)) {
      this.copyOutlets(data.name, i, outlet);
    } else {
      const conf = confirm(`Are you want to duplicate ${outlet.name}?`);
      if (conf) {
        data.sort = 0;
        console.log('add', data);
        this.cloneOutlet(data, old_id);
        // this.fireDB.col(`outlets/${this.outletID}/${MenuItemFirePath}`).add(data);
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

  cloneOutlet(outlet: any, old_id: string) {
    // console.log('clone', outlet, old_id);

    // create outlet
    outlet['id'] = this.fireDB.afs.createId();
    console.log('id', outlet['id']);
    this.fireDB.set(`${OutletFirePath}/${outlet['id']}`, outlet).catch((err) => {
      this.toastr.error(err, 'Error!');
    });

    // get inventory material
    const listLink = [
      {
        old: `outlets/${old_id}/entities/manage/addon`,
        new: `outlets/${outlet['id']}/entities/manage/addon`,
      },
      {
        old: `outlets/${old_id}/entities/manage/category`,
        new: `outlets/${outlet['id']}/entities/manage/category`,
      },
      {
        old: `outlets/${old_id}/entities/manage/item`,
        new: `outlets/${outlet['id']}/entities/manage/item`,
      },
      {
        old: `outlets/${old_id}/entities/manage/menu`,
        new: `outlets/${outlet['id']}/entities/manage/menu`,
      },
      {
        old: `outlets/${old_id}/entities/setting/deliZone`,
        new: `outlets/${outlet['id']}/entities/setting/deliZone`,
      },
      {
        old: `outlets/${old_id}/entities/setting/tempClose`,
        new: `outlets/${outlet['id']}/entities/setting/tempClose`,
      },
      // {
      //   old: `outlets/${old_id}/entities/setting/user`,
      //   new: `outlets/${outlet['id']}/entities/setting/user`,
      // },
    ];
    for (let index1 = 0; index1 < listLink.length; index1++) {
      const element1 = listLink[index1];
      const inventory_material = this.fireDB.colWithIds$(element1.old).subscribe((response: any) => {
        for (let index = 0; index < response.length; index++) {
          const element = response[index];
          const tmp = {...element};
          delete tmp['id'];
          this.fireDB.set(`${element1.new}/${element.id}`, tmp);
        }
        inventory_material.unsubscribe();
      });
    }
  }
}
