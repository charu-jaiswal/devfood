
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { ReservationFirePath } from '../../../firestore.path';
import { Reservation } from '../reservation.model';
import * as _ from 'lodash'
// import Rx from 'rxjs/Rx';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  ReservationList: Reservation[];
  outletID: string | null;

  constructor(public fireDB: FirestoreService, private route: ActivatedRoute, public toastr: ToastrService) { }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.paramMap.get('outletid');
    this.fireDB.colWithIds$(`outlets/${this.outletID}/${ReservationFirePath}`).subscribe((response: any) => {
      this.ReservationList = _.orderBy(response, 'sort', 'desc');

      console.table(this.ReservationList);
      
    });
  }

  deleteReservation(event: Event, ReservationID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`outlets/${this.outletID}/${ReservationFirePath}/${ReservationID}`);
      this.toastr.success('Reservation Deleted', 'Success!');
    }
    return;
  }

}
