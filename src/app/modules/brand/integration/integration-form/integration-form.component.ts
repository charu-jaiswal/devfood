import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { IntegrationFirePath } from '../../../firestore.path';
import { Integration } from '../integration.model';

@Component({
  selector: 'bsetting-integration-form',
  templateUrl: './integration-form.component.html',
  styleUrls: ['./integration-form.component.css'],
})
export class IntegrationFormComponent implements OnInit {
  integrationID: string | null;
  integration: Integration;
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe2 = this.fireDB.doc$(`${IntegrationFirePath}`).subscribe((integrationData: any) => {
      this.integration = integrationData;
      FbDbSubscribe2.unsubscribe();
    });
  }

  addIntegration(integrationForm: any) {
    if (!integrationForm.invalid) {
      this.fireDB.set(IntegrationFirePath, integrationForm.form.value);
      this.toastr.success('Integration Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(integrationForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
