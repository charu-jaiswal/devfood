import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, toArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { OutletFirePath, GlobalSettingFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { Outlet, SelectFormVal, dayList } from '../outlet.model';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
declare var google: any;
import * as _ from 'lodash';

@Component({
  selector: 'outlets-outlet-form',
  templateUrl: './outlet-form.component.html',
  styleUrls: ['./outlet-form.component.css'],
})
export class OutletFormComponent implements OnInit {
  OutletForm: NgForm;
  outletID: string | null;
  outlet: Outlet;
  cuisineList: any;
  tagsList: any;
  filterList: any;
  bigIconFile: File | null;
  dayList: SelectFormVal;
  cityList: SelectFormVal;
  quillToolbar: any;
  textColor = '#ffffff';
  bgColor = '#ffffff';
  langList: any;
  // globalAdr = '';

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public fireDB: FirestoreService,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
      );
      autocomplete.addListener('place_changed', () => {
        this.zone.run(() => {
          console.log(autocomplete.getPlace());
          const place = autocomplete.getPlace();
          // this.globalAdr = place.formatted_address;
          this.outlet.address = {};
          this.outlet.address.address = place.formatted_address;
          for (
            let index = 0;
            index < place.address_components.length;
            index++
          ) {
            const element = place.address_components[index];
            if (element.types.indexOf('administrative_area_level_1') !== -1) {
              this.outlet.address.state = element.long_name;
            }
          }
          this.outlet.address.lat = place.geometry.location.lat();
          this.outlet.address.long = place.geometry.location.lng();
          // console.log(this.outlet);
        });
      });
    });

    this.outlet = {
      commission: {
        tableRes: {
          perc: 0,
          flat: 0,
        },
        delivery: {
          perc: 0,
          flat: 0,
        },
        takeAway: {
          perc: 0,
          flat: 0,
        },
      },
    };
    // this.outlet.info = {
    this.bgColor = '#ffffff';
    this.textColor = '#ffffff';
    // };
    this.dayList = dayList;
    this.outletID = this.route.snapshot.paramMap.get('id');
    const FbDbSubscribe1 = this.fireDB
      .doc$(`${GlobalSettingFirePath}`)
      .subscribe((cuisines: any) => {
        if (cuisines) {
          if (cuisines.general.city) {
            this.cityList = map(cuisines.general.city, (city) => ({
              label: city,
              value: city,
            }));
          }
          if (cuisines.general.cuisines) {
            this.cuisineList = map(cuisines.general.cuisines, (cuisine) => ({
              label: cuisine,
              value: cuisine,
            }));
          }
          if (cuisines.general.tags) {
            this.tagsList = map(cuisines.general.tags, (tag) => ({
              label: tag,
              value: tag,
            }));
          }
          if (cuisines.general.outletFilter) {
            this.filterList = map(cuisines.general.outletFilter, (filter) => ({
              label: filter,
              value: filter,
            }));
          }
        }
        FbDbSubscribe1.unsubscribe();
      });
    if (this.outletID) {
      const FbDbSubscribe2 = this.fireDB
        .doc$(`${OutletFirePath}/${this.outletID}`)
        .subscribe((outletData: any) => {
          // console.log(outletData);
          this.outlet = outletData;
          FbDbSubscribe2.unsubscribe();
        });
    } else {
      this.fireDB.colWithIds$(OutletFirePath).subscribe((outletList: any) => {
        this.fireDB.doc$(`setting/adminConf`).subscribe((adminConf: any) => {
          if (adminConf.outletLimit && outletList.length > adminConf.outletLimit) {
            this.router.navigate(['/tutorial/payment']);
          }
        });
      });
    }
    this.quillToolbar = {
      toolbar: [
        ['bold', 'italic', 'underline'],
        ['blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ align: [] }],
        ['clean'],
      ],
    };
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.outlet.lang = this.outlet.lang || {
            name: {
              name: 'Name',
              lList: []
            },
            subTitle: {
              name: 'Subtitle',
              lList: []
            },
            unavailableAlert: {
              name: 'Unavailabe Alert',
              lList: []
            },
            expressDeliTitle: {
              name: 'Express Delivery Title',
              lList: []
            },
          };
          if (!this.outlet.lang.unavailableAlert) {
            this.outlet.lang.unavailableAlert = {
              name: 'Unavailabe Alert',
              lList: []
            };
          }
          if (!this.outlet.lang.expressDeliTitle) {
            this.outlet.lang.expressDeliTitle = {
              name: 'Express Delivery Title',
              lList: []
            };
          }
          _.forIn(this.outlet.lang, (langField) => {
            _.forEach(this.langList, (lang) => {
              if (!_.find(langField.lList, { id: lang.code })) {
                langField.lList.push({
                  id: lang.code,
                  val: '',
                });
              }
            });
          });
        }
        FbDbSubscribe0.unsubscribe();
      });
  }

  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        if (this.outletID) {
          this.toastr.info('File uploading..', 'Wait!');
          const uploadTask = this.fireDB.uploadFileToStorage(
            `outlet/${this.outletID}/logo/original.jpg`,
            event.target.files[0],
          );
          uploadTask.then().then(
            (snapshot) => {
              snapshot.ref.getDownloadURL().then((imageUrl: string) => {
                if (this.outlet) {
                  this.outlet.info = this.outlet.info || {};
                  this.outlet.info.image = imageUrl;
                }
                this.toastr.success('File uploaded', 'Success!');
              });
            },
            (reason) => {
              this.toastr.error(
                'Invalid image size/format. Please retry with correct image.',
                'Error!',
              );
            },
          );
        } else {
          this.bigIconFile = event.target.files[0];
        }
      }
    }
  }

  deleteFile(type: string) {
    if (type === 'image') {
      if (this.outletID) {
        this.fireDB.deleteFileStorage(
          `outlet/${this.outletID}/logo/original.jpg`,
        );
        if (this.outlet && this.outlet.info) {
          this.outlet.info.image = '';
        }
      } else {
        this.bigIconFile = null;
      }
    }
  }
  uploadFile1(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        if (this.outletID) {
          this.toastr.info('File uploading..', 'Wait!');
          const uploadTask = this.fireDB.uploadFileToStorage(
            `outlet/${this.outletID}/category/original.jpg`,
            event.target.files[0],
          );
          uploadTask.then().then(
            (snapshot) => {
              snapshot.ref.getDownloadURL().then((imageUrl: string) => {
                if (this.outlet) {
                  this.outlet.catDefaultImg = imageUrl;
                }
                this.toastr.success('File uploaded', 'Success!');
              });
            },
            (reason) => {
              this.toastr.error(
                'Invalid image size/format. Please retry with correct image.',
                'Error!',
              );
            },
          );
        } else {
          this.bigIconFile = event.target.files[0];
        }
      }
    }
  }

  deleteFile1(type: string) {
    if (type === 'image') {
      if (this.outletID) {
        this.fireDB.deleteFileStorage(
          `outlet/${this.outletID}/category/original.jpg`,
        );
        if (this.outlet && this.outlet.catDefaultImg) {
          this.outlet.catDefaultImg = '';
        }
      } else {
        this.bigIconFile = null;
      }
    }
  }

  addMoreOperatingHours() {
    if (this.outlet) {
      this.outlet.opHrs = this.outlet.opHrs || [];
      this.outlet.opHrs.push({
        fromTime: '',
        toTime: '',
        day: '',
      });
    }
  }

  deleteOperatingHour(i: number) {
    if (this.outlet && this.outlet.opHrs) {
      this.outlet.opHrs.splice(i, 1);
    }
  }

  addMoreTimeRanges() {
    if (this.outlet) {
      this.outlet.postDeliTime = this.outlet.postDeliTime || {};
      this.outlet.postDeliTime.timeRange = this.outlet.postDeliTime.timeRange || [];
      this.outlet.postDeliTime.timeRange.push({
        fromTime: '',
        toTime: '',
        price: 0,
        maxOrders: 0,
      });
    }
  }

  deleteTimeRange(i: number) {
    if (this.outlet && this.outlet.postDeliTime && this.outlet.postDeliTime.timeRange) {
      this.outlet.postDeliTime.timeRange.splice(i, 1);
    }
  }

  addMoreExpressTimeRanges() {
    if (this.outlet) {
      this.outlet.postDeliTime = this.outlet.postDeliTime || {};
      this.outlet.postDeliTime.expressDeli = this.outlet.postDeliTime.expressDeli || {};
      this.outlet.postDeliTime.expressDeli.timeRange = this.outlet.postDeliTime.expressDeli.timeRange || [];
      this.outlet.postDeliTime.expressDeli.timeRange.push({
        fromTime: '',
        toTime: '',
      });
    }
  }

  deleteExpressTimeRange(i: number) {
    if (this.outlet && this.outlet.postDeliTime && this.outlet.postDeliTime.expressDeli && this.outlet.postDeliTime.expressDeli.timeRange) {
      this.outlet.postDeliTime.expressDeli.timeRange.splice(i, 1);
    }
  }

  addSMS(sms: number) {
    if (isNaN(sms)) {
      return false;
    } else {
      return sms;
    }
  }

  addEmail(email: string) {
    if (
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        email,
      )
    ) {
      return email;
    } else {
      return false;
    }
  }

  addCall(call: number) {
    if (isNaN(call)) {
      return false;
    } else {
      return call;
    }
  }

  addOutlet(outletForm: NgForm) {
    const nameOutlet = outletForm.form.value.name;
    // outletForm.form.value.address.address = this.globalAdr;
    // console.log(outletForm);
    if (!outletForm.invalid) {

      if (outletForm.form.value.lang) {
        _.forIn(outletForm.form.value.lang, (langField) => {
          langField.lList = toArray(langField.lList);
        });
      }
      if (outletForm.form.value.opHrs) {
        outletForm.form.value.opHrs = toArray(outletForm.form.value.opHrs);
      }
      if (outletForm.form.value.postDeliTime && outletForm.form.value.postDeliTime.timeRange) {
        outletForm.form.value.postDeliTime.timeRange = toArray(outletForm.form.value.postDeliTime.timeRange);
      }
      if (outletForm.form.value.postDeliTime && outletForm.form.value.postDeliTime.expressDeli && outletForm.form.value.postDeliTime.expressDeli.timeRange) {
        outletForm.form.value.postDeliTime.expressDeli.timeRange = toArray(outletForm.form.value.postDeliTime.expressDeli.timeRange);
      }
      if (outletForm.form.value.isHidden === null || outletForm.form.value.isHidden === undefined) {
        outletForm.form.value.isHidden = false;
      }
      if (outletForm.form.value.isDisabled === null || outletForm.form.value.isDisabled === undefined) {
        outletForm.form.value.isDisabled = false;
      }
      if (outletForm.form.value.address.lat && outletForm.form.value.address.long) {
        outletForm.form.value.address.location = this.fireDB.geopoint(outletForm.form.value.address.lat, outletForm.form.value.address.long);
      }
      if (this.outletID) {
        this.fireDB.set(
          `${OutletFirePath}/${this.outletID}`,
          outletForm.form.value,
        );
        this.toastr.success('Outlet Updated', 'Success!');
        this.router.navigate(['../..'], { relativeTo: this.route });
      } else {
        const value = nameOutlet;
        this.fireDB
          .add(OutletFirePath, outletForm.form.value)
          .then((documentRef) => {
            console.log(documentRef, outletForm.form.value);
            const outletID = documentRef.id;
            if (this.bigIconFile) {
              const uploadTask = this.fireDB.uploadFileToStorage(
                `outlet/${outletID}/logo/original.jpg`,
                this.bigIconFile,
              );
              this.toastr.info('File uploading..', 'Wait!');
              uploadTask.then().then((snapshot) => {
                snapshot.ref.getDownloadURL().then((imageUrl: string) => {
                  documentRef.update({
                    info: {
                      image: imageUrl,
                    },
                  });
                  this.router.navigate(['../..'], { relativeTo: this.route });
                  this.toastr.success('Outlet created', 'Success!');
                });
              });
            } else {
              this.router.navigate(['../..'], { relativeTo: this.route });
              this.toastr.success('Outlet created', 'Success!');
            }
          });
      }
    } else {
      this.fireDB.validateAllFormFields(outletForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

  onChangeColor(value: any, type: string) {
    if (type === 'bgColor') {
      this.OutletForm.value.info.bgColor = value;
    } else {
      this.OutletForm.value.info.textColor = value;
    }
  }
}
