import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../../core/firestore.service';
import { TemporaryClosureFirePath } from '../../../../firestore.path';
import { SelectFormVal, TemporaryClosure, disableList } from '../temporary-closure.model';

@Component({
  selector: 'setting-temporary-closure-form',
  templateUrl: './temporary-closure-form.component.html',
  styleUrls: ['./temporary-closure-form.component.css'],
})
export class TemporaryClosureFormComponent implements OnInit {
  temporaryClosureID: any;
  outletID: string | null;
  temporaryClosure: TemporaryClosure;
  disables: SelectFormVal;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) {
  }
  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.paramMap.get('outletid');
    this.temporaryClosureID = this.route.snapshot.paramMap.get('id');
    this.disables = disableList;
    if (this.temporaryClosureID) {
      const FbDbSubscribe = this.fireDB.doc$(`outlets/${this.outletID}/${TemporaryClosureFirePath}/${this.temporaryClosureID}`).subscribe((temporaryClosureData: TemporaryClosure) => {
        this.temporaryClosure = temporaryClosureData;
        FbDbSubscribe.unsubscribe();
      });
    } else {
      this.temporaryClosure = {};
    }
  }
  addTemporaryClosure(temporaryClosureForm: any) {
    if (!temporaryClosureForm.invalid) {
      if (this.temporaryClosureID) {
        this.fireDB.set(`outlets/${this.outletID}/${TemporaryClosureFirePath}/${this.temporaryClosureID}`, temporaryClosureForm.form.value);
        this.toastr.success('Temporary Closure Updated', 'Success!');
      } else {
        this.fireDB.add(`outlets/${this.outletID}/${TemporaryClosureFirePath}`, temporaryClosureForm.form.value);
        this.toastr.success('Temporary Closure Created', 'Success!');
      }
      this.router.navigate(['../..'], { relativeTo: this.route });
    } else {
      this.fireDB.validateAllFormFields(temporaryClosureForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }

  }

}
