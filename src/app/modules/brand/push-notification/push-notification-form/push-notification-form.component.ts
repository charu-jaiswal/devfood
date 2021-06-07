import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { PushNotificationFirePath } from '../../../firestore.path';
import { PushNotification } from '../push-notification.model';

@Component({
  selector: 'brand-push-notification-form',
  templateUrl: './push-notification-form.component.html',
  styleUrls: ['./push-notification-form.component.css'],
})
export class PushNotificationFormComponent implements OnInit {
  pushNotification: PushNotification;
  bigIconFile: File | null;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe = this.fireDB.doc$(`${PushNotificationFirePath}`).subscribe((pushNotificationData: any) => {
      this.pushNotification = pushNotificationData;
      FbDbSubscribe.unsubscribe();
    });
  }

  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        this.toastr.info('File uploading..', 'Wait!');
        const uploadTask = this.fireDB.uploadFileToStorage(`brand/pushNotify/original.jpg`, event.target.files[0]);
        uploadTask.then().then((snapshot) => {
          snapshot.ref.getDownloadURL().then((imageUrl: string) => {
            if (this.pushNotification) {
              this.pushNotification.image = imageUrl;
            }
            this.toastr.success('File uploaded', 'Success!');
          });
        }, (reason) => {
          this.toastr.error('Invalid image size/format. Please retry with correct image.', 'Error!');
        });
      }
    }
  }

  deleteFile(type: string) {
    if (type === 'image') {
      this.fireDB.deleteFileStorage(`brand/pushNotify/original.jpg`);
      if (this.pushNotification) {
        this.pushNotification.image = '';
      }
    }
  }

  addPushNotificationForm(pushNotificationForm: any) {
    // console.log(pushNotificationForm);
    if (!pushNotificationForm.invalid) {
      this.fireDB.set(PushNotificationFirePath, pushNotificationForm.form.value);
      this.toastr.success('Push Notification Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(pushNotificationForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
