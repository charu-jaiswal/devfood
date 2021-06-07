import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { AppAppearanceFirePath } from '../../../firestore.path';
import { AppAppearance } from '../../app-appearance/app-appearance.model';

@Component({
  selector: 'brand-app-appearance-form',
  templateUrl: './app-appearance-form.component.html',
  styleUrls: ['./app-appearance-form.component.css'],
})
export class AppAppearanceFormComponent implements OnInit {
  appAppearance: AppAppearance;
  bigIconFile: File | null;
  primaryColor = '#ffffffff';
  secondaryColor = '#ffffffff';

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe = this.fireDB.doc$(`${AppAppearanceFirePath}`).subscribe((appAppearanceData: AppAppearance) => {
      this.appAppearance = appAppearanceData;
      FbDbSubscribe.unsubscribe();
    });
  }

  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        const path = `app-appearance/brand/`;
        this.toastr.info('File uploading..', 'Wait!');
        const uploadTask = this.fireDB.uploadFileToStorage(`brand/${path}/original.jpg`, event.target.files[0]);
        uploadTask.then().then((snapshot) => {
          snapshot.ref.getDownloadURL().then((imageUrl: string) => {
            this.appAppearance.icon = imageUrl;
            this.toastr.success('File uploaded', 'Success!');
          });
        }, (reason) => {
          this.toastr.error('Invalid image size/format. Please retry with correct image.', 'Error!');
        });
      }
    }
  }

  deleteFile(type: string, typ: string, nm: string) {
    if (type === 'image') {
      const path = `app-appearance/brand/`;
      this.fireDB.deleteFileStorage(`brand/${path}/original.jpg`);
      this.appAppearance.icon = '';
    }
  }

  addAppAppearance(appAppearanceForm: any) {
    // console.log(appAppearanceForm.form.value);
    if (!appAppearanceForm.invalid) {
      this.fireDB.set(AppAppearanceFirePath, appAppearanceForm.form.value);
      this.toastr.success('App Appearance Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(appAppearanceForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

  onChangeColor(value: any, appAppearanceForm: any, type: string) {
    // console.log(value, appAppearanceForm);
    if (type === 'primary') {
      appAppearanceForm.form.value.color.primary = value;
    } else {
      appAppearanceForm.form.value.color.secondary = value;
    }
  }

}
