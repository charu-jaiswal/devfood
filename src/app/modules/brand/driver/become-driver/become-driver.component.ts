import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { BecomeDriverFirePath } from '../../../firestore.path';
import { Driver } from '../driver.model';

@Component({
  selector: 'brand-become-driver',
  templateUrl: './become-driver.component.html',
  styleUrls: ['./become-driver.component.css'],
})
export class BecomeDriverListComponent implements OnInit {
  driverList: any = [];

  constructor(public fireDB: FirestoreService, public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe1 = this.fireDB.colWithIds$(BecomeDriverFirePath).subscribe((driverData: any) => {
      this.driverList = driverData;
      FbDbSubscribe1.unsubscribe();
  });
}

  deleteDriver(event: Event, driverID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`${BecomeDriverFirePath}/${driverID}`);
      this.toastr.success('Driver Deleted', 'Success!');
    }
    return;
  }

}
