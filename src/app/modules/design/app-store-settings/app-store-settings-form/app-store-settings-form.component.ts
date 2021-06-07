import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { AppStoreSettingsFirePath } from '../../../firestore.path';
import { AppStoreSettings } from '../app-store-settings.model';

@Component({
  selector: 'brand-app-store-settings-form',
  templateUrl: './app-store-settings-form.component.html',
  styleUrls: ['./app-store-settings-form.component.css'],
})
export class AppStoreSettingsFormComponent implements OnInit {
  appStoreSettings: AppStoreSettings;
  bigIconFile: File | null;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe = this.fireDB.doc$(`${AppStoreSettingsFirePath}`).subscribe((appStoreSettingsData: AppStoreSettings) => {
      this.appStoreSettings = appStoreSettingsData;
      FbDbSubscribe.unsubscribe();
    });
  }
  addTag(tagName: string) {
    return tagName;
  }
  uploadFile(event: any, type: string, typ: string, nm: string) {
    if (event && type && typ && nm) {
      if (type === 'image') {
        const path = `app-store/${typ}/`;
        this.toastr.info('File uploading..', 'Wait!');
        const uploadTask = this.fireDB.uploadFileToStorage(`brand/${path}/${nm}.jpg`, event.target.files[0]);
        uploadTask.then().then((snapshot) => {
          snapshot.ref.getDownloadURL().then((imageUrl: string) => {
            if (typ === 'android' && this.appStoreSettings && this.appStoreSettings.screen) {
              this.appStoreSettings.screen.android = this.appStoreSettings.screen.android || {};
              switch (nm) {
                case 'android-img1':
                  this.appStoreSettings.screen.android.img1 = imageUrl;
                  break;
                case 'android-img2':
                  this.appStoreSettings.screen.android.img2 = imageUrl;
                  break;
                case 'android-img3':
                  this.appStoreSettings.screen.android.img3 = imageUrl;
                  break;
                case 'android-img4':
                  this.appStoreSettings.screen.android.img4 = imageUrl;
                  break;
                case 'android-img5':
                  this.appStoreSettings.screen.android.img5 = imageUrl;
                  break;
                default:
              }
            } else if (typ === 'ios' && this.appStoreSettings && this.appStoreSettings.screen) {
              this.appStoreSettings.screen.ios = this.appStoreSettings.screen.ios || {};
              switch (nm) {
                case 'ios-img1':
                  this.appStoreSettings.screen.ios.img1 = imageUrl;
                  break;
                case 'ios-img2':
                  this.appStoreSettings.screen.ios.img2 = imageUrl;
                  break;
                case 'ios-img3':
                  this.appStoreSettings.screen.ios.img3 = imageUrl;
                  break;
                case 'ios-img4':
                  this.appStoreSettings.screen.ios.img4 = imageUrl;
                  break;
                case 'ios-img5':
                  this.appStoreSettings.screen.ios.img5 = imageUrl;
                  break;
                default:
              }
            }
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
      const path = `app-store/${typ}/`;
      this.fireDB.deleteFileStorage(`brand/${path}/${nm}.jpg`);
      if (typ === 'ios' && this.appStoreSettings && this.appStoreSettings.screen && this.appStoreSettings.screen.ios) {
        switch (nm) {
          case 'ios-img1':
            this.appStoreSettings.screen.ios.img1 = '';
            break;
          case 'ios-img2':
            this.appStoreSettings.screen.ios.img2 = '';
            break;
          case 'ios-img3':
            this.appStoreSettings.screen.ios.img3 = '';
            break;
          case 'ios-img4':
            this.appStoreSettings.screen.ios.img4 = '';
            break;
          case 'ios-img5':
            this.appStoreSettings.screen.ios.img5 = '';
            break;
          default:
        }
      } else if (typ === 'android' && this.appStoreSettings && this.appStoreSettings.screen && this.appStoreSettings.screen.android) {
        switch (nm) {
          case 'android-img1':
            this.appStoreSettings.screen.android.img1 = '';
            break;
          case 'android-img2':
            this.appStoreSettings.screen.android.img2 = '';
            break;
          case 'android-img3':
            this.appStoreSettings.screen.android.img3 = '';
            break;
          case 'android-img4':
            this.appStoreSettings.screen.android.img4 = '';
            break;
          case 'android-img5':
            this.appStoreSettings.screen.android.img5 = '';
            break;
          default:
        }
      }
    }
  }

  addAppStoreSettings(appStoreSettingsForm: any) {
    if (!appStoreSettingsForm.invalid) {
      this.fireDB.set(AppStoreSettingsFirePath, appStoreSettingsForm.form.value);
      this.toastr.success('App Store Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(appStoreSettingsForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
