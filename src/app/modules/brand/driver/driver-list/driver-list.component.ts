import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { DriverFirePath } from '../../../firestore.path';
import { Driver } from '../driver.model';

@Component({
  selector: 'brand-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css'],
})
export class DriverListComponent implements OnInit {
  driverList: Observable<Driver[]>;

  constructor(public fireDB: FirestoreService, public toastr: ToastrService) { }

  ngOnInit() {
    this.driverList = this.fireDB.colWithIds$(DriverFirePath);
  }

  deleteDriver(event: Event, driverID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`${DriverFirePath}/${driverID}`);
      this.toastr.success('Driver Deleted', 'Success!');
    }
    return;
  }

}
