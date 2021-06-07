import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { OutletCateFirePath, OutletFirePath, GlobalSettingFirePath, MultiLanguageFirePath } from '../../../firestore.path';
import { OutletCategory } from '../outlet-category.model';
import * as _ from 'lodash';

@Component({
  selector: 'brand-outlet-category-form',
  templateUrl: './outlet-category-form.component.html',
  styleUrls: ['./outlet-category-form.component.css'],
})
export class OutletCategoryFormComponent implements OnInit {
  outletCategoryID: string | null;
  outletCategory: OutletCategory;
  outletList: any = [];
  filterList: any = [];
  bigIconFile: File | null;
  langList: any;

  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.outletCategoryID = this.route.snapshot.paramMap.get('id');
    const FbDbSubscribe2 = this.fireDB.colWithIds$(`${OutletFirePath}`).subscribe((outletData) => {
      this.outletList = outletData;
        FbDbSubscribe2.unsubscribe();
    });
    const FbDbSubscribe1 = this.fireDB
      .doc$(`${GlobalSettingFirePath}`)
      .subscribe((cuisines: any) => {
        if (cuisines) {
          if (cuisines.general.outletFilter) {
            this.filterList = _.map(cuisines.general.outletFilter, (filter) => ({
              label: filter,
              value: filter,
            }));
          }
        }
        FbDbSubscribe1.unsubscribe();
      });
    if (this.outletCategoryID) {
      const FbDbSubscribe = this.fireDB.doc$(`${OutletCateFirePath}/${this.outletCategoryID}`).subscribe((outletCategoryData: any) => {
        this.outletCategory = outletCategoryData;
        console.log(outletCategoryData);
        FbDbSubscribe.unsubscribe();
      });
    } else {
      this.outletCategory = {};
    }
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.outletCategory.lang = this.outletCategory.lang || {
            title: {
              name: 'Title',
              lList: []
            },
            subTitle: {
              name: 'Subtitle',
              lList: []
            },
          };
          _.forIn(this.outletCategory.lang, (langField) => {
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
        if (this.outletCategoryID) {
          this.toastr.info('File uploading..', 'Wait!');
          const uploadTask = this.fireDB.uploadFileToStorage(`brand/outletCategory/${this.outletCategoryID}/original.jpg`, event.target.files[0]);
          uploadTask.then().then((snapshot) => {
            snapshot.ref.getDownloadURL().then((imageUrl: string) => {
              if (this.outletCategory) {
                this.outletCategory.image = imageUrl;
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
      if (this.outletCategoryID) {
        this.fireDB.deleteFileStorage(`brand/outletCategory/${this.outletCategoryID}/original.jpg`);
        if (this.outletCategory && this.outletCategory.image) {
          this.outletCategory.image = '';
        }
      } else {
        this.bigIconFile = null;
      }
    }
  }

  addOutletCategoryForm(outletCategoryForm: any) {
    if (!outletCategoryForm.invalid) {
      if (outletCategoryForm.form.value.lang) {
        _.forIn(outletCategoryForm.form.value.lang, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      if (this.outletCategoryID) {
        this.fireDB.set(`${OutletCateFirePath}/${this.outletCategoryID}`, outletCategoryForm.form.value);
        this.toastr.success('Outlet Category Updated', 'Success!');
      } else {
        this.fireDB.add(OutletCateFirePath, outletCategoryForm.form.value)
          .then((documentRef) => {
            const outletCategoryID = documentRef.id;
            if (this.bigIconFile) {
              const uploadTask = this.fireDB.uploadFileToStorage(`brand/outletCategory/${outletCategoryID}/original.jpg`, this.bigIconFile);
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
        this.toastr.success('Outlet Category Created', 'Success!');
      }
      this.router.navigate(['/design/outlet-category/list']);
    } else {
      this.fireDB.validateAllFormFields(outletCategoryForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
