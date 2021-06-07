import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { CouponFirePath, RewardFirePath } from '../../../firestore.path';
import { Reward } from '../reward.model';
import * as _ from 'lodash';

@Component({
  selector: 'brand-reward-form',
  templateUrl: './reward-form.component.html',
  styleUrls: ['./reward-form.component.css'],
})
export class RewardFormComponent implements OnInit {
  rewardID: string | null;
  reward: Reward;
  couponList: any;
  bigIconFile: File | null;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.rewardID = this.route.snapshot.paramMap.get('id');
    const FbDbSubscribe1 = this.fireDB.colWithIds$(`${CouponFirePath}`).subscribe((couponData) => {
      this.couponList = couponData;
      FbDbSubscribe1.unsubscribe();
    });
    if (this.rewardID) {
      const FbDbSubscribe = this.fireDB.doc$(`${RewardFirePath}/${this.rewardID}`).subscribe((rewardData: any) => {
        this.reward = rewardData;
        console.log(rewardData);
        FbDbSubscribe.unsubscribe();
      });
    } else {
      this.reward = {};
    }
  }

  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        if (this.rewardID) {
          this.toastr.info('File uploading..', 'Wait!');
          const uploadTask = this.fireDB.uploadFileToStorage(`brand/reward/${this.rewardID}/original.jpg`, event.target.files[0]);
          uploadTask.then().then((snapshot) => {
            snapshot.ref.getDownloadURL().then((imageUrl: string) => {
              if (this.reward) {
                this.reward.image = imageUrl;
              }
              this.toastr.success('File uploaded', 'Success!');
            });
          }, (reason) => {
            this.toastr.error('Invalid image size/format. Please retry with correct image.', 'Error!');
          });
        } else {
          this.bigIconFile = event.target.files[0];
        }
      }
    }
  }

  deleteFile(type: string) {
    if (type === 'image') {
      if (this.rewardID) {
        this.fireDB.deleteFileStorage(`brand/reward/${this.rewardID}/original.jpg`);
        if (this.reward && this.reward.image) {
          this.reward.image = '';
        }
      } else {
        this.bigIconFile = null;
      }
    }
  }

  addRewardForm(rewardForm: any) {
    if (!rewardForm.invalid) {
      if (this.rewardID) {
        this.fireDB.set(`${RewardFirePath}/${this.rewardID}`, rewardForm.form.value);
        this.toastr.success('Reward Updated', 'Success!');
      } else {
        this.fireDB.add(RewardFirePath, rewardForm.form.value)
          .then((documentRef) => {
            const rewardID = documentRef.id;
            if (this.bigIconFile) {
              const uploadTask = this.fireDB.uploadFileToStorage(`brand/reward/${rewardID}/original.jpg`, this.bigIconFile);
              this.toastr.info('File uploading..', 'Wait!');
              uploadTask.then().then((snapshot) => {
                snapshot.ref.getDownloadURL().then((imageUrl: string) => {
                  documentRef.update({
                    image: imageUrl,
                  });
                });
              });
            }
          });
        this.toastr.success('Reward Created', 'Success!');
      }
      this.router.navigate(['/settings/reward/list']);
    } else {
      this.fireDB.validateAllFormFields(rewardForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
