import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { CatGroupFirePath } from '../../../firestore.path';
import { CatGroup } from '../cat-group.model';
import * as _ from 'lodash';

@Component({
  selector: 'outlet-cat-group-list',
  templateUrl: './cat-group-list.component.html',
  styleUrls: ['./cat-group-list.component.css'],
})
export class CatGroupListComponent implements OnInit {
  catGroupList: CatGroup[];
  outletID: string | null;

  constructor(public fireDB: FirestoreService, private route: ActivatedRoute, public toastr: ToastrService) { }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.paramMap.get('outletid');
    this.fireDB.colWithIds$(`outlets/${this.outletID}/${CatGroupFirePath}`).subscribe((response: any) => {
      this.catGroupList = _.orderBy(response, 'name', 'asc');
    });
  }

  deleteCatGroup(event: Event, catGroupID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`outlets/${this.outletID}/${CatGroupFirePath}/${catGroupID}`);
      this.toastr.success('Category Group Deleted', 'Success!');
    }
    return;
  }

}
