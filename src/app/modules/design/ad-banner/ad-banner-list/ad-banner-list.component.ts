import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { AdBannerFirePath } from '../../../firestore.path';
import { AdBanner } from '../ad-banner.model';
import * as _ from 'lodash';

@Component({
  selector: 'brand-ad-banner-list',
  templateUrl: './ad-banner-list.component.html',
  styleUrls: ['./ad-banner-list.component.css'],
})
export class AdBannerListComponent implements OnInit {
  adBannerList: AdBanner[];

  constructor(public fireDB: FirestoreService, public toastr: ToastrService) { }

  ngOnInit() {
    this.fireDB.colWithIds$(AdBannerFirePath).subscribe((response) => {
      this.adBannerList = _.orderBy(response, ['sort', 'name'], ['desc', 'asc']);
      // console.log(this.adBannerList);
    });
  }

  deleteAdBanner(event: Event, adBannerID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`${AdBannerFirePath}/${adBannerID}`);
      this.toastr.success('Ad Banner Deleted', 'Success!');
    }
    return;
  }

}
