
import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { toArray, get } from 'lodash';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { ReservationFirePath, CategoryFirePath, CatGroupFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { Reservation, SelectFormVal, dayList } from '../reservation.model';
import { Form, NgForm } from '@angular/forms';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

 ReservationModel:any[]=[
   {
      
     opHrs:[{
      fromTime: '',
      toTime: '',
      day: '',    
      maxperson: 0,
      charges:0
     }]
   }
 ]
  ReservationID: string | null;
  outletID: string | null;
  outletData: any;
  isCategory: boolean = false;
  Reservation: any;
  categoryList: any;
 
  dayList: SelectFormVal;
  langList: any;
  Arr = [1]; //Array type captured in a variable
  arrValue:any=1;
 
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.dayList = dayList;
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.paramMap.get('outletid');
    console.log("  this.outletID",  this.outletID);
  
    this.ReservationID = this.route.snapshot.paramMap.get('id');
    console.log("this.ReservationID",this.ReservationID);
    
    if (this.ReservationID) {
      const FbDbSubscribe2 = this.fireDB.doc$(`outlets/${this.outletID}/${ReservationFirePath}/${this.ReservationID}`).subscribe((ReservationData: any) => {
        this.Reservation = ReservationData;
        FbDbSubscribe2.unsubscribe();
      });
    } else {
      this.Reservation = {};
    }

  }

  addMoreOperatingHours(i:any,t:any) {
    if(t=='col'){
      let obj= {
         fromTime: '',
         toTime: '',
         day: '',    
         maxperson: 0,
         charges:0
       
    }
    this.ReservationModel[i].opHrs.push(obj); //Add column in exiting card 
    }else if(t=='row'){
      let obj= {         
        opHrs:[{
         fromTime: '',
         toTime: '',
         day: '',    
         maxperson: 0,
         charges:0
        }]
    }
    this.ReservationModel.push(obj); //add new form card 
  }
  
 
  }
 
  deleteOperatingHour(i: number,j:number) {
 
    if (this.ReservationModel.length>0 && this.ReservationModel[i].opHrs.length>0) {
      this.ReservationModel[i].opHrs[j].splice(j, 1);
    }
  }

  addReservation(ReservationForm: any) {
    
    if (!ReservationForm.invalid) {
      //convert object into array
      // if (ReservationForm.form.value.opHrs) {
      //   ReservationForm.form.value.opHrs = toArray(ReservationForm.form.value.opHrs);
      // }
      if (this.ReservationID) {      
        this.fireDB.set(`outlets/${this.outletID}/${ReservationFirePath}/${this.ReservationID}`, {...this.ReservationModel});
        this.toastr.success('Reservation Updated', 'Success!');
      } else {
        const path= `outlets/${this.outletID}/${ReservationFirePath}`;
        this.fireDB.add(path, {...this.ReservationModel});
        this.toastr.success('Reservation Created', 'Success!');
      }
      this.router.navigate(['../..'], { relativeTo: this.route });
    } else {
      this.fireDB.validateAllFormFields(ReservationForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }
  trackByFn(index:any, item:any) {
    return index; // or item.id
  }
}
