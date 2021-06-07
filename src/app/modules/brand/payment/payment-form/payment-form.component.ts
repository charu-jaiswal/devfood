import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { FirestoreService } from '../../../../core/firestore.service';
import { PaymentSettingFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { Payment } from '../payment.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent implements OnInit {
  payment: any;
  PaymentForm: NgForm;
  color = '#ffffff';
  langList: any;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    const FbDbSubscribe = this.fireDB.doc$(`${PaymentSettingFirePath}`).subscribe((paymentData: any) => {
      const razorpayColor = _.get(paymentData, 'pymtDetail.razorpay.config.color', null);
      if (razorpayColor) {
        this.color = razorpayColor;
      }
      this.payment = paymentData;
      console.log(paymentData);
      FbDbSubscribe.unsubscribe();
    });
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.payment.lang = this.payment.lang || {
            cash: {
              name: 'Cash',
              lList: []
            },
            stripe: {
              name: 'Stripe',
              lList: []
            },
            razorpay: {
              name: 'Razorpay',
              lList: []
            },
            cardFee: {
              name: 'Card Fee',
              lList: []
            },
          };
          this.payment.lang.cod = this.payment.lang.cod || {
            name: 'Card on Delivery',
            lList: []
          };
          this.payment.lang.paypal = this.payment.lang.paypal || {
            name: 'Paypal',
            lList: []
          };
          _.forIn(this.payment.lang, (langField) => {
            _.forEach(this.langList, (lang) => {
              if (!_.find(langField.lList, { id: lang.code })) {
                langField.lList.push({
                  id: lang.code,
                  val: '',
                });
              }
            });
          });
          this.payment.langDesc = this.payment.langDesc || {
            cash: {
              name: 'Cash',
              lList: []
            },
            stripe: {
              name: 'Stripe',
              lList: []
            },
            razorpay: {
              name: 'Razorpay',
              lList: []
            },
            cardFee: {
              name: 'Card Fee',
              lList: []
            },
            cod: {
              name: 'Card on Delivery',
              lList: []
            }
          };
          this.payment.langDesc.paypal = this.payment.langDesc.paypal || {
            name: 'Paypal',
            lList: []
          };
          _.forIn(this.payment.langDesc, (langField) => {
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
  addPaymentForm(paymentForm: any) {
    // console.log(pushNotificationForm);
    if (!paymentForm.invalid) {
      if (paymentForm.form.value.lang) {
        _.forIn(paymentForm.form.value.lang, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      if (paymentForm.form.value.langDesc) {
        _.forIn(paymentForm.form.value.langDesc, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      _.forIn(paymentForm.form.value.pymtDetail, (value, key) => {
        if (key === 'cash') {
          paymentForm.form.value.pymtDetail[key].isCash = true;
        } else {
          paymentForm.form.value.pymtDetail[key].isCash = false;
        }
      });
      this.fireDB.set(PaymentSettingFirePath, paymentForm.form.value);
      this.toastr.success('Payment Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(paymentForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

  onChangeColor(value: any, PaymentForm: any, type: string) {
    this.color = value;
    if (type === 'razorpayColor') {
      PaymentForm.form.value.pymtDetail.razorpay.config.color = value;
    }
  }

  resetDefaultGateway(PaymentForm: any) {
    delete PaymentForm.form.value.defaultGateway;
  }

  addTips(tip: any) {
    if (isNaN(parseInt(tip, 10))) {
      return false;
    } else {
      return parseInt(tip, 10);
    }
  }
  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        this.toastr.info('File uploading..', 'Wait!');
        const uploadTask = this.fireDB.uploadFileToStorage(`brand/payment/original.jpg`, event.target.files[0]);
        uploadTask.then().then((snapshot) => {
          snapshot.ref.getDownloadURL().then((imageUrl: string) => {
            if (this.payment.pymtDetail) {
              if (this.payment.pymtDetail.razorpay) {
                this.payment.pymtDetail.razorpay.image = imageUrl;
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

  deleteFile(type: string) {
    if (type === 'image') {
      this.fireDB.deleteFileStorage(`brand/payment/original.jpg`);
      if (this.payment.pymtDetail) {
        if (this.payment.pymtDetail.razorpay) {
          this.payment.pymtDetail.razorpay.image = '';
        }
      }
    }
  }
}
