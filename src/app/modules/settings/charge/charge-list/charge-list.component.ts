import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { ChargeFirePath } from '../../../firestore.path';
import { Charge } from '../charge.model';

@Component({
  selector: 'bsetting-charge-list',
  templateUrl: './charge-list.component.html',
  styleUrls: ['./charge-list.component.css'],
})
export class ChargeListComponent implements OnInit {
  chargeList: Observable<Charge[]>;

  constructor(public fireDB: FirestoreService, public toastr: ToastrService) { }

  ngOnInit() {
    this.chargeList = this.fireDB.colWithIds$(ChargeFirePath);
  }

  deleteCharge(event: Event, chargeID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`${ChargeFirePath}/${chargeID}`);
      this.toastr.success('Charge Deleted', 'Success!');
    }
    return;
  }

}
