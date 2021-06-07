import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { MenuFirePath } from '../../../firestore.path';
import { Menu } from '../menu.model';
import * as _ from 'lodash';

@Component({
  selector: 'outlet-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit {
  menuList: Menu[];
  outletID: string | null;

  constructor(public fireDB: FirestoreService, private route: ActivatedRoute, public toastr: ToastrService) { }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.paramMap.get('outletid');
    this.fireDB.colWithIds$(`outlets/${this.outletID}/${MenuFirePath}`).subscribe((response: any) => {
      this.menuList = _.orderBy(response, 'sort', 'desc');
    });
  }

  deleteMenu(event: Event, menuID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`outlets/${this.outletID}/${MenuFirePath}/${menuID}`);
      this.toastr.success('Menu Deleted', 'Success!');
    }
    return;
  }

}
