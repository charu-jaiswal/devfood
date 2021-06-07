import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AuthService, User } from '../../../../core/auth.service';
import { FirestoreService } from '../../../../core/firestore.service';
import { BrandFirePath, DeliverySetupFirePath } from '../../../firestore.path';
import { Brand, SelectFormVal } from '../brand.model';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
declare var google: any;

@Component({
  selector: 'brand-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css'],
})
export class BrandFormComponent implements OnInit {
  map: any;
  drawingManager: any;
  brandID: string | null;
  deliverySetupID: string | null;
  brand: Brand;
  bigIconFile: File;
  user: User | null;
  countries: SelectFormVal;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  constructor(public fireDB: FirestoreService,
    private afs: AngularFirestore,
    public auth: AuthService,
    private zone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) {
    this.user = this.auth.userDetail;
  }

  ngOnInit() {
    const FbDbSubscribe1 = this.fireDB.docRoot$(`global/countryDetail`).subscribe((countryData: any) => {
      this.countries = countryData.country;
      FbDbSubscribe1.unsubscribe();
    });
    const FbDbSubscribe2 = this.fireDB.doc$(`${BrandFirePath}`).subscribe((brandData: any) => {
      this.brand = brandData || {};
      FbDbSubscribe2.unsubscribe();
    });

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
      );
      autocomplete.addListener('place_changed', () => {
        this.zone.run(() => {
          // console.log(autocomplete.getPlace());
          const place = autocomplete.getPlace();
          // this.globalAdr = place.formatted_address;
          this.brand.address = {};
          this.brand.address.address = place.formatted_address;
          for (
            let index = 0;
            index < place.address_components.length;
            index++
          ) {
            const element = place.address_components[index];
            if (element.types.indexOf('administrative_area_level_1') !== -1) {
              this.brand.address.state = element.long_name;
            }
          }
          this.brand.address.lat = place.geometry.location.lat();
          this.brand.address.long = place.geometry.location.lng();
          // console.log(this.outlet);
        });
      });
    });
  }

  compareByOptionCode(firstOption: any, secondOption: any) {
    return firstOption && secondOption && firstOption.name === secondOption.name;
  }

  addBrand(brandForm: any) {
    if (!brandForm.invalid) {
      this.fireDB.set(BrandFirePath, brandForm.form.value);
      this.toastr.success('Brand Updated', 'Success!');
      if (this.user && !this.user.brandSetup) {
        this.fireDB.docRoot(`admin/${this.user.uid}`).update({
          brandSetup: true,
        });
        this.router.navigate(['/brand/global-setting/setting']);
      }
    } else {
      this.fireDB.validateAllFormFields(brandForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }
  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        this.toastr.info('File uploading..', 'Wait!');
        const uploadTask = this.fireDB.uploadFileToStorage(`brand/outlet/original.jpg`, event.target.files[0]);
        uploadTask.then().then((snapshot) => {
          snapshot.ref.getDownloadURL().then((imageUrl: string) => {
            if (this.brand) {
              this.brand.image = this.brand.image || {};
              this.brand.image.outlet = imageUrl;
            }
            this.toastr.success('File uploaded', 'Success!');
          });
        }, (reason) => {
          this.toastr.error('Invalid image size/format. Please retry with correct image.', 'Error!');
        });
      } else if (type === 'logo') {
        this.toastr.info('File uploading..', 'Wait!');
        const uploadTask = this.fireDB.uploadFileToStorage(`brand/outlet/logo.jpg`, event.target.files[0]);
        uploadTask.then().then((snapshot) => {
          snapshot.ref.getDownloadURL().then((imageUrl: string) => {
            if (this.brand) {
              this.brand.image = this.brand.image || {};
              this.brand.image.logo = imageUrl;
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
      this.fireDB.deleteFileStorage(`brand/outlet/original.jpg`);
      if (this.brand && this.brand.image) {
        this.brand.image.outlet = '';
      }
    } else if (type === 'logo') {
      this.fireDB.deleteFileStorage(`brand/outlet/logo.jpg`);
      if (this.brand && this.brand.image) {
        this.brand.image.logo = '';
      }
    }
  }
}
