import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { TaxFirePath } from '../../../firestore.path';
import { Tax } from '../tax.model';

@Component({
  selector: 'bsetting-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.css'],
})
export class TaxListComponent implements OnInit {
  taxList: Observable<Tax[]>;

  constructor(public fireDB: FirestoreService, public toastr: ToastrService) { }

  ngOnInit() {
    this.taxList = this.fireDB.colWithIds$(TaxFirePath);
  }

  deleteTax(event: Event, taxID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`${TaxFirePath}/${taxID}`);
      this.toastr.success('Tax Deleted', 'Success!');
    }
    return;
  }

}
