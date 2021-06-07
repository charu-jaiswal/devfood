import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, toArray } from 'lodash';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { CouponFirePath, CategoryFirePath, MenuItemFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { Coupon, SelectFormVal, dayList } from '../coupon.model';

@Component({
  selector: 'coupon-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css'],
})
export class CouponFormComponent implements OnInit {
  couponID: string | null;
  coupon: any;
  outletList: any;
  dayList?: SelectFormVal;
  catList: any;
  itemList: any;
  imageFile: File | null;
  couponsList: any[];
  selOutletID: string = '';
  quillToolbar: any;
  langList: any;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.quillToolbar = {
      toolbar: [
        ['bold', 'italic', 'underline'],
        ['blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['clean'],
      ],
    };
    this.fireDB.colWithIds$(CouponFirePath).subscribe((response: any) => {
      // console.log(response);
      this.couponsList = response;
    });
    this.dayList = dayList;
    this.fireDB.colWithIds$(`outlets`).subscribe((outletData) => {
      this.outletList = outletData;
    });
    this.couponID = this.route.snapshot.paramMap.get('id');
    if (this.couponID) {
      this.fireDB.doc$(`${CouponFirePath}/${this.couponID}`).subscribe((couponData: any) => {
        this.coupon = couponData;
        if (this.coupon && this.coupon.condition && this.coupon.condition.applyOutlet && this.coupon.condition.applyOutlet.singleOutlet && this.coupon.condition.applyOutlet.singleOutlet.id) {
          this.selOutletID = this.coupon.condition.applyOutlet.singleOutlet.id;
          this.fireDB.colWithIds$(`outlets/${this.selOutletID}/${CategoryFirePath}`).subscribe((categoryData) => {
            this.catList = categoryData;
          });
          if (this.coupon.condition.applyOutlet.singleOutlet.catID) {
            const catID = this.coupon.condition.applyOutlet.singleOutlet.catID;
            this.fireDB.colWithIds$(`outlets/${this.selOutletID}/${MenuItemFirePath}`, (ref: any) => ref.where('category', '==', catID)).subscribe((itemData) => {
              this.itemList = itemData;
            });
          }
        }
      });
    } else {
      this.coupon = {
        condition: {
          isOnePerUser: true,
          applyOutlet: {
            outType: 'AllOutlets'
          },
          applyType: {
            isDelivery: true,
          },
          couponFor: {
            web: true,
            iOS: true,
            android: true,
          },
          application: 'dontDisplay'
        }
      };
    }
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.coupon.lang = this.coupon.lang || {
            dispName: {
              name: 'Display Name',
              lList: []
            },
            desc: {
              name: 'Description',
              lList: []
            },
          };
          _.forIn(this.coupon.lang, (langField) => {
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

  changeOutlet(sel: any) {
    if (sel) {
      this.selOutletID = sel;
      // if (_.get(this.coupon, 'condition.applyOutlet.singleOutlet.category', null)) {
      //   this.coupon.condition.applyOutlet.singleOutlet.category = [];
      // }
      // if (_.get(this.coupon, 'condition.applyOutlet.singleOutlet.item', null)) {
      //   this.coupon.condition.applyOutlet.singleOutlet.item = [];
      // }
      if (_.get(this.coupon, 'condition.applyOutlet.singleOutlet.catID', null)) {
        this.coupon.condition.applyOutlet.singleOutlet.catID = '';
      }
      this.fireDB.colWithIds$(`outlets/${sel}/${CategoryFirePath}`).subscribe((categoryData) => {
        this.catList = categoryData;
      });
    }
  }

  changeCategory(catID: any) {
    if (catID) {
      // if (_.get(this.coupon, 'condition.applyOutlet.singleOutlet.item', null)) {
      //   this.coupon.condition.applyOutlet.singleOutlet.item = [];
      // }
      this.fireDB.colWithIds$(`outlets/${this.selOutletID}/${MenuItemFirePath}`, (ref: any) => ref.where('category', '==', catID)).subscribe((itemData) => {
        this.itemList = itemData;
      });
    }
  }
  addMoreHappyHours() {
    if (this.coupon) {
      this.coupon.happyHrs = this.coupon.happyHrs || [];
      this.coupon.happyHrs.push({
        fromTime: '',
        toTime: '',
        day: '',
      });
    }
  }

  deleteHappyHour(i: number) {
    if (this.coupon && this.coupon.happyHrs) {
      this.coupon.happyHrs.splice(i, 1);
    }
  }

  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        if (this.couponID) {
          this.toastr.info('File uploading..', 'Wait!');
          const uploadTask = this.fireDB.uploadFileToStorage(`coupon/${this.couponID}/original.jpg`, event.target.files[0]);
          uploadTask.then().then((snapshot) => {
            snapshot.ref.getDownloadURL().then((imageUrl: string) => {
              if (this.coupon) {
                this.coupon.desc = this.coupon.desc || {};
                this.coupon.desc.image = imageUrl;
              }
              this.toastr.success('File uploaded', 'Success!');
            });
          }, (reason) => {
            this.toastr.error('Invalid image size/format. Please retry with correct image.', 'Error!');
          });
        } else {
          this.imageFile = event.target.files[0];
        }
      }
    }
  }

  deleteFile(type: string) {
    if (type === 'image') {
      if (this.couponID) {
        this.fireDB.deleteFileStorage(`coupon/${this.couponID}/original.jpg`);
        if (this.coupon && this.coupon.desc) {
          this.coupon.desc.image = '';
        }
      } else {
        this.imageFile = null;
      }
    }
  }

  addCoupon(couponForm: any) {
    // console.log(couponForm);
    if (!couponForm.invalid) {
      couponForm.form.value.code = couponForm.form.value.code.toUpperCase();
      let flag = false;
      for (let index = 0; index < this.couponsList.length; index++) {
        const element = this.couponsList[index];
        if (element.code === couponForm.form.value.code && this.couponID !== element.id) {
          flag = true;
          break;
        }
      }
      if (flag) {
        alert('The code has already used!');
        return;
      }
      if (couponForm.form.value.happyHrs) {
        couponForm.form.value.happyHrs = toArray(couponForm.form.value.happyHrs);
      }
      if (couponForm.form.value.lang) {
        _.forIn(couponForm.form.value.lang, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      if (this.couponID) {
        this.fireDB.set(`${CouponFirePath}/${this.couponID}`, couponForm.form.value);
        this.toastr.success('Coupon Updated', 'Success!');
      } else {
        this.fireDB.add(CouponFirePath, couponForm.form.value)
          .then((documentRef) => {
            const couponID = documentRef.id;
            if (this.imageFile) {
              const uploadTask = this.fireDB.uploadFileToStorage(`coupon/${couponID}/original.jpg`, this.imageFile);
              this.toastr.info('File uploading..', 'Wait!');
              uploadTask.then().then((snapshot) => {
                snapshot.ref.getDownloadURL().then((imageUrl: string) => {
                  const updateData: any = {};
                  updateData['desc.image'] = imageUrl;
                  documentRef.update(updateData);
                  this.router.navigate(['/settings/coupons/list']);
                  this.toastr.success('Coupon Created', 'Success!');
                });
              });
            } else {
              this.router.navigate(['/settings/coupons/list']);
              this.toastr.success('Coupon Created', 'Success!');
            }
          });
      }
      this.router.navigate(['/settings/coupons/list']);
    } else {
      this.fireDB.validateAllFormFields(couponForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
