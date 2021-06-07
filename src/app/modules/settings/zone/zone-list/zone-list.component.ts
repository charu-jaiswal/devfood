import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { ZoneFirePath } from '../../../firestore.path';
import { Zone } from './../zone.model';

@Component({
  selector: 'setting-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css'],
})
export class ZoneListComponent implements OnInit {
  deliverySetupList: Observable<Zone[]>;
  constructor(public fireDB: FirestoreService, private route: ActivatedRoute, public toastr: ToastrService) { }

  ngOnInit() {
    this.deliverySetupList = this.fireDB.colWithIds$(`${ZoneFirePath}`);
  }

  deleteDeliverySetup(event: Event, DeliverySetupID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`${ZoneFirePath}/${DeliverySetupID}`);
      this.toastr.success('Zone Deleted', 'Success!');
    }
    return;
  }

}
