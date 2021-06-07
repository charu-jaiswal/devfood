import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../../core/firestore.service';
import { AddonFirePath, AdminSettingFirePath } from '../../../../firestore.path';
import { Addon } from '../addon.model';

@Component({
  selector: 'outlet-addon-list',
  templateUrl: './addon-list.component.html',
  styleUrls: ['./addon-list.component.css'],
})
export class AddonListComponent implements OnInit {
  outletID: string | null;
  addonList: Observable<Addon[]>;
  deletePassCode = null;

  constructor(public fireDB: FirestoreService, private route: ActivatedRoute, private router: Router, public toastr: ToastrService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url.split('/')[4] === 'menu-builder') {
          this.ngOnInit();
        }
      }
    });
  }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 2].snapshot.paramMap.get('outletid');
    this.addonList = this.fireDB.colWithIds$(`outlets/${this.outletID}/${AddonFirePath}`);
    this.fireDB.doc$(AdminSettingFirePath).subscribe((adminConf: any) => {
      this.deletePassCode = adminConf.deletePassCode;
    });
  }

  deleteAddon(event: Event, addonID: string) {
    if (this.deletePassCode) {
      const userEnterPass = window.prompt('Please enter the Password for deletion ?');
      if (userEnterPass == this.deletePassCode) {
        this.fireDB.delete(`outlets/${this.outletID}/${AddonFirePath}/${addonID}`);
        this.toastr.success('Addon Deleted', 'Success!');
      } else {
        this.toastr.error('Wrong Password', 'Error!');
      }
      return;
    }
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`outlets/${this.outletID}/${AddonFirePath}/${addonID}`);
      this.toastr.success('Addon Deleted', 'Success!');
    }
    return;
  }

  disableAddon(event: Event, addon: any) {
    const response = confirm(`are you sure you want to ${addon.isDisable ? 'enable' : 'disable'}?`);
    if (response) {
      this.fireDB.update(`outlets/${this.outletID}/${AddonFirePath}/${addon.id}`, {
        isDisable: !addon.isDisable,
      });
      this.toastr.success(`Addon ${addon.isDisable ? 'Enable' : 'Disable'}d`, 'Success!');
    }
    return;
  }

  copyAddon(name: string, outlet: any) {
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

    if (this.addonList && !this.checkName(this.addonList, data.name)) {
      this.copyAddon(data.name, outlet);
    } else {
      const conf = confirm(`Are you want to duplicate ${outlet.name}?`);
      if (conf) {
        this.fireDB.col(`outlets/${this.outletID}/${AddonFirePath}`).add(data);
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
