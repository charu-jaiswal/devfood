import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../../../core/firestore.service';
import { RewardFirePath } from '../../../firestore.path';
import { Reward } from '../reward.model';
import * as _ from 'lodash';

@Component({
  selector: 'brand-reward-list',
  templateUrl: './reward-list.component.html',
  styleUrls: ['./reward-list.component.css'],
})
export class RewardListComponent implements OnInit {
  RewardList: Reward[];

  constructor(public fireDB: FirestoreService, public toastr: ToastrService) { }

  ngOnInit() {
    this.fireDB.colWithIds$(RewardFirePath).subscribe((response) => {
      this.RewardList = _.orderBy(response, ['isDisabled', 'sort', 'title'], ['asc', 'desc', 'asc']);
    });
  }

  deleteReward(event: Event, RewardID: string) {
    const response = confirm('are you sure you want to delete?');
    if (response) {
      this.fireDB.delete(`${RewardFirePath}/${RewardID}`);
      this.toastr.success('Reward Deleted', 'Success!');
    }
    return;
  }

  disableReward(event: Event, reward: any) {
    let confirmDisable;
    if (!reward.isDisabled) {
      confirmDisable = confirm('are you sure you want to disble?');
    } else {
      confirmDisable = confirm('are you sure you want to enable?');
    }
    if (confirmDisable) {
      this.fireDB
        .update(`${RewardFirePath}/${reward.id}`, {
          isDisabled: !reward.isDisabled,
        })
        .then(() => {
          if (!reward.isDisabled) {
            this.toastr.success('Reward Disabled', 'Success!');
          } else {
            this.toastr.success('Reward Enabled', 'Success!');
          }
        })
        .catch((err: any) => {
          this.toastr.error(err, 'Error!');
        });
    }
  }

}
