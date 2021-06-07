import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { CategoryFirePath, AdBannerFirePath, MenuItemFirePath, ZoneFirePath, OutletCateFirePath } from '../../../firestore.path';
import { AdBanner } from '../ad-banner.model';
import * as _ from 'lodash';

@Component({
  selector: 'brand-ad-banner-form',
  templateUrl: './ad-banner-form.component.html',
  styleUrls: ['./ad-banner-form.component.css'],
})
export class AdBannerFormComponent implements OnInit {
  adBannerID: string | null;
  selOutletID: string = '';
  adBanner: AdBanner;
  outletCatList: any = [];
  zoneList: any = [];
  outletList: any = [];
  catList: any = [];
  itemList: any = [];
  mobileBannerFile: File | null;
  webBannerFile: File | null;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.adBannerID = this.route.snapshot.paramMap.get('id');
    this.fireDB.colWithIds$(`outlets`).subscribe((outletData) => {
      this.outletList = outletData;
    });
    this.fireDB.colWithIds$(`${OutletCateFirePath}`).subscribe((outletCatData) => {
      this.outletCatList = [
        {id: 'All', title: 'All Outlet Category'},
        {id: 'Home', title: 'Home'},
        ...outletCatData
      ];
    });
    this.fireDB.colWithIds$(`${ZoneFirePath}`).subscribe((zoneData) => {
      this.zoneList = [
        {id: 'All', name: 'All Zone'},
        ...zoneData
      ];
    });
    if (this.adBannerID) {
      const FbDbSubscribe = this.fireDB.doc$(`${AdBannerFirePath}/${this.adBannerID}`).subscribe((adBannerData: any) => {
        this.adBanner = adBannerData;
        FbDbSubscribe.unsubscribe();
        if (this.adBanner && this.adBanner.outlet) {
          this.selOutletID = this.adBanner.outlet;
          this.fireDB.colWithIds$(`outlets/${this.adBanner.outlet}/${CategoryFirePath}`).subscribe((categoryData) => {
            this.catList = categoryData;
            if (this.adBanner.category) {
              const selCategoryID = _.get(_.find(this.catList, {name: this.adBanner.category}), 'id', null);
              if (selCategoryID) {
                this.fireDB.colWithIds$(`outlets/${this.adBanner.outlet}/${MenuItemFirePath}`, (ref: any) => ref.where('category', '==', selCategoryID)).subscribe((itemData) => {
                  this.itemList = itemData;
                });
              }
            }
          });
        }
      });
    } else {
      this.adBanner = {
        linkType: 'none'
      };
    }
  }

  changeOutlet(sel: any) {
    if (sel) {
      this.adBanner.category = '';
      this.adBanner.item = '';
      this.selOutletID = sel;
      this.fireDB.colWithIds$(`outlets/${sel}/${CategoryFirePath}`).subscribe((categoryData) => {
        this.catList = categoryData;
      });
    }
  }

  changeCategory(catName: any) {
    if (catName) {
      const selCategoryID = _.get(_.find(this.catList, {name: catName}), 'id', null);
      if (selCategoryID) {
        this.fireDB.colWithIds$(`outlets/${this.selOutletID}/${MenuItemFirePath}`, (ref: any) => ref.where('category', '==', selCategoryID)).subscribe((itemData) => {
          this.itemList = itemData;
        });
      }
    }
  }

  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        if (this.adBannerID) {
          this.toastr.info('File uploading..', 'Wait!');
          const uploadTask = this.fireDB.uploadFileToStorage(`brand/adBanner/${this.adBannerID}/mobileBanner.jpg`, event.target.files[0]);
          uploadTask.then().then((snapshot) => {
            snapshot.ref.getDownloadURL().then((imageUrl: string) => {
              if (this.adBanner) {
                this.adBanner.image = imageUrl;
              }
              this.toastr.success('File uploaded', 'Success!');
            });
          }, (reason) => {
            this.toastr.error('Invalid image size/format. Please retry with correct image.', 'Error!');
          });
        } else {
          this.mobileBannerFile = event.target.files[0];
        }
      }
    }
  }

  deleteFile(type: string) {
    if (type === 'image') {
      if (this.adBannerID) {
        this.fireDB.deleteFileStorage(`brand/adBanner/${this.adBannerID}/mobileBanner.jpg`);
        if (this.adBanner && this.adBanner.image) {
          this.adBanner.image = '';
        }
      } else {
        this.mobileBannerFile = null;
      }
    }
  }

  uploadFile1(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        if (this.adBannerID) {
          this.toastr.info('File uploading..', 'Wait!');
          const uploadTask = this.fireDB.uploadFileToStorage(`brand/adBanner/${this.adBannerID}/webBanner.jpg`, event.target.files[0]);
          uploadTask.then().then((snapshot) => {
            snapshot.ref.getDownloadURL().then((imageUrl: string) => {
              if (this.adBanner) {
                this.adBanner.webBanner = imageUrl;
              }
              this.toastr.success('File uploaded', 'Success!');
            });
          }, (reason) => {
            this.toastr.error('Invalid image size/format. Please retry with correct image.', 'Error!');
          });
        } else {
          this.webBannerFile = event.target.files[0];
        }
      }
    }
  }

  deleteFile1(type: string) {
    if (type === 'image') {
      if (this.adBannerID) {
        this.fireDB.deleteFileStorage(`brand/adBanner/${this.adBannerID}/webBanner.jpg`);
        if (this.adBanner && this.adBanner.webBanner) {
          this.adBanner.webBanner = '';
        }
      } else {
        this.webBannerFile = null;
      }
    }
  }

  addAdBannerForm(adBannerForm: any) {
    if (!adBannerForm.invalid) {
      if (this.adBannerID) {
        this.fireDB.set(`${AdBannerFirePath}/${this.adBannerID}`, adBannerForm.form.value);
        this.toastr.success('Ad Banner Updated', 'Success!');
      } else {
        this.fireDB.add(AdBannerFirePath, adBannerForm.form.value)
          .then((documentRef) => {
            const adBannerID = documentRef.id;
            if (this.mobileBannerFile) {
              const uploadTask = this.fireDB.uploadFileToStorage(`brand/adBanner/${adBannerID}/mobileBanner.jpg`, this.mobileBannerFile);
              this.toastr.info('File uploading..', 'Wait!');
              uploadTask.then().then((snapshot) => {
                snapshot.ref.getDownloadURL().then((imageUrl: string) => {
                  documentRef.update({
                    image: imageUrl,
                  });
                });
              });
            }
            if (this.webBannerFile) {
              const uploadTask = this.fireDB.uploadFileToStorage(`brand/adBanner/${adBannerID}/webBanner.jpg`, this.webBannerFile);
              this.toastr.info('File uploading..', 'Wait!');
              uploadTask.then().then((snapshot) => {
                snapshot.ref.getDownloadURL().then((imageUrl: string) => {
                  documentRef.update({
                    webBanner: imageUrl,
                  });
                });
              });
            }
          });
        this.toastr.success('Ad Banner Created', 'Success!');
      }
      this.router.navigate(['/design/ad-banner/list']);
    } else {
      this.fireDB.validateAllFormFields(adBannerForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
