import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { AppWalkthroughFirePath } from '../../../firestore.path';
import { WalkThrough } from '../../walkthrough/walkthrough.model';

@Component({
  selector: 'brand-walkthrough-list',
  templateUrl: './walkthrough-list.component.html',
  styleUrls: ['./walkthrough-list.component.css'],
})
export class WalkThroughListComponent implements OnInit {
  walkThroughList: Observable<WalkThrough[]>;

  constructor(public fireDB: FirestoreService, public toastr: ToastrService) { }

  ngOnInit() {
    this.walkThroughList = this.fireDB.colWithIds$(AppWalkthroughFirePath);
  }

  deleteWalkThrough(event: Event, walkThroughID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`${AppWalkthroughFirePath}/${walkThroughID}`);
      this.toastr.success('Walk Through Deleted', 'Success!');
    }
    return;
  }

}
