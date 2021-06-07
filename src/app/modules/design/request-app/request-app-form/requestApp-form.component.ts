import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { RequestAppFirePath } from '../../../firestore.path';
import { RequestApp } from '../requestApp.model';
import * as _ from 'lodash';
import { map, toArray } from 'lodash';

@Component({
  selector: 'requestapp-form',
  templateUrl: './requestApp-form.component.html',
  styleUrls: ['./requestApp-form.component.css'],
})
export class RequestAppFormComponent implements OnInit {
  requestApp: any;
  color = '#ff0000ff';
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe = this.fireDB.doc$(`${RequestAppFirePath}`).subscribe((requestAppData: any) => {
      const primaryColor = _.get(requestAppData, 'color', null);
      if (primaryColor) {
        this.color = primaryColor;
      }
      this.requestApp = requestAppData;
      FbDbSubscribe.unsubscribe();
    });
  }

  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        this.toastr.info('File uploading..', 'Wait!');
        const uploadTask = this.fireDB.uploadFileToStorage(`design/requestApp/original.jpg`, event.target.files[0]);
        uploadTask.then().then((snapshot) => {
          snapshot.ref.getDownloadURL().then((imageUrl: string) => {
            if (this.requestApp) {
              this.requestApp.icon = imageUrl;
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
      this.fireDB.deleteFileStorage(`design/requestApp/original.jpg`);
      if (this.requestApp) {
        this.requestApp.icon = '';
      }
    }
  }
  uploadFile1(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        this.toastr.info('File uploading..', 'Wait!');
        const uploadTask = this.fireDB.uploadFileToStorage(`design/requestApp1/original.jpg`, event.target.files[0]);
        uploadTask.then().then((snapshot) => {
          snapshot.ref.getDownloadURL().then((imageUrl: string) => {
            if (this.requestApp) {
              // this.requestApp.splashScreen = this.requestApp.splashScreen || {};
              this.requestApp.splashScreen = imageUrl;
            }
            this.toastr.success('File uploaded', 'Success!');
          });
        }, (reason) => {
          this.toastr.error('Invalid image size/format. Please retry with correct image.', 'Error!');
        });
      }
    }
  }

  deleteFile1(type: string) {
    if (type === 'image') {
      this.fireDB.deleteFileStorage(`design/requestApp1/original.jpg`);
      if (this.requestApp && this.requestApp.splashScreen) {
        this.requestApp.splashScreen = '';
      }
    }
  }

  onChangeColor(value: any, RequestAppForm: any, type: string) {
    this.color = value;
    if (type === 'primaryColor') {
      RequestAppForm.form.value.color = value;
    }
  }
  addRequestApp(RequestAppForm: any) {
    if (!RequestAppForm.invalid) {
      this.fireDB.set(RequestAppFirePath, RequestAppForm.form.value);
      this.toastr.success('Request App Settings Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(RequestAppForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }
}
