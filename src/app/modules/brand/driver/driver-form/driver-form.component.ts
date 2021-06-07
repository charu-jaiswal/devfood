import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { DriverFirePath, BecomeDriverFirePath, ZoneFirePath } from '../../../firestore.path';
import { Driver } from '../driver.model';
import * as _ from 'lodash';

@Component({
  selector: 'brand-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css'],
})
export class DriverFormComponent implements OnInit {
  driverID: string | null;
  becomeDriverID: string | null;
  driver: Driver;
  outletList: any;
  zoneList: any;
  apply: boolean;
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe1 = this.fireDB.colWithIds$(`outlets`).subscribe((outletData) => {
      this.outletList = outletData;
      FbDbSubscribe1.unsubscribe();
    });
    const FbDbSubscribe3 = this.fireDB.colWithIds$(`${ZoneFirePath}`).subscribe((zoneData) => {
      this.zoneList = zoneData;
      FbDbSubscribe3.unsubscribe();
    });
    this.driverID = this.route.snapshot.paramMap.get('id');
    this.becomeDriverID = this.route.snapshot.paramMap.get('becomeDriverID');
    if (this.driverID) {
      const FbDbSubscribe2 = this.fireDB.doc$(`${DriverFirePath}/${this.driverID}`).subscribe((driverData: any) => {
        this.driver = driverData;
        FbDbSubscribe2.unsubscribe();
      });
    } else if (this.becomeDriverID) {
      const FbDbSubscribe2 = this.fireDB.doc$(`${BecomeDriverFirePath}/${this.becomeDriverID}`).subscribe((driverData: any) => {
        this.driver = driverData;
        FbDbSubscribe2.unsubscribe();
      });
    } else {
      this.apply = true;
      this.driver = {};
    }
  }

  addDriver(driverForm: any) {
    if (!driverForm.invalid) {
      const driverData = driverForm.form.value;
      if (!_.get(driverData, 'condition.isAllOutlet') && (_.get(driverData, 'condition.condType') == 'zone')) {
        const zoneID = _.get(driverData, 'condition.zone');
        if (zoneID) {
          driverData.condition.outlets = _.get(_.find(this.zoneList, {id: zoneID}), 'outlets');
        }
      }
      if (this.driverID) {
        this.fireDB.update(`${DriverFirePath}/${this.driverID}`, driverData);
        this.toastr.success('Driver Updated', 'Success!');
      } else if (this.becomeDriverID) {
        this.fireDB.add(DriverFirePath, driverData).then(() => {
          this.fireDB.doc(`${BecomeDriverFirePath}/${this.becomeDriverID}`).delete();
          this.toastr.success('Driver Approved', 'Success!');
          this.router.navigate(['/brand/driver/becomeList']);
        });
        return;
      } else {
        this.fireDB.add(DriverFirePath, driverData);
        this.toastr.success('Driver Created', 'Success!');
      }
      this.router.navigate(['/brand/driver/list']);
    } else {
      this.fireDB.validateAllFormFields(driverForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
