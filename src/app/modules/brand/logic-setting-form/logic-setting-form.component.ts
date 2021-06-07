import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../core/firestore.service';
import { LogicSettingFirePath } from '../../firestore.path';

@Component({
  selector: 'brand-logic-setting-form',
  templateUrl: './logic-setting-form.component.html',
  styleUrls: ['./logic-setting-form.component.css'],
})
export class LogicSettingFormComponent implements OnInit {
  logicSetting: any;
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe = this.fireDB.doc$(`${LogicSettingFirePath}`).subscribe((logicSettingData: any) => {
      this.logicSetting = logicSettingData;
      FbDbSubscribe.unsubscribe();
    });
  }
  addVoid(tagName: string) {
    return tagName;
  }
  addComp(tagName: string) {
    return tagName;
  }
  addRefund(tagName: string) {
    return tagName;
  }
  savelogicSetting(logicSettingForm: any) {
    if (!logicSettingForm.invalid) {
      this.fireDB.set(LogicSettingFirePath, logicSettingForm.form.value);
      this.toastr.success('Logic Settings Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(logicSettingForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
