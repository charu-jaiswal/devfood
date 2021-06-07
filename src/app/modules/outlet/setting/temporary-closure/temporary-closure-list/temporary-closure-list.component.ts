import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../../core/firestore.service';
import { TemporaryClosureFirePath } from '../../../../firestore.path';
import { TemporaryClosure } from '../temporary-closure.model';

@Component({
  selector: 'setting-temporary-closure-list',
  templateUrl: './temporary-closure-list.component.html',
  styleUrls: ['./temporary-closure-list.component.css'],
})
export class TemporaryClosureListComponent implements OnInit {
  temporaryClosureList: Observable<TemporaryClosure[]>;
  outletID: string | null;

  constructor(public fireDB: FirestoreService, private route: ActivatedRoute, public toastr: ToastrService) { }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.paramMap.get('outletid');
    this.temporaryClosureList = this.fireDB.colWithIds$(`outlets/${this.outletID}/${TemporaryClosureFirePath}`);
  }

  deleteTemporaryClosure(event: Event, temporaryClosureID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`outlets/${this.outletID}/${TemporaryClosureFirePath}/${temporaryClosureID}`);
      this.toastr.success('Temporary Closure Deleted', 'Success!');
    }
    return;
  }

}
