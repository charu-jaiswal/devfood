import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { FirestoreService } from '../../../../../core/firestore.service';
import { CategoryFirePath, MultiLanguageFirePath } from '../../../../firestore.path';
import { Category } from '../category.model';

@Component({
  selector: 'outlet-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  categoryID: string | null;
  outletID: string | null;
  category: any;
  imageFile: File | null;
  langList: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public fireDB: FirestoreService) { }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 3].snapshot.paramMap.get('outletid');
    this.categoryID = this.route.snapshot.paramMap.get('id');
    if (this.categoryID) {
      const FbDbSubscribe = this.fireDB.doc$(`outlets/${this.outletID}/${CategoryFirePath}/${this.categoryID}`).subscribe((categoryData: any) => {
        this.category = categoryData;
        FbDbSubscribe.unsubscribe();
      });
    } else {
      this.category = {};
    }
    const FbDbSubscribe0 = this.fireDB
      .doc$(`${MultiLanguageFirePath}`)
      .subscribe((multiLang: any) => {
        this.langList = multiLang && multiLang.languages || [];
        if (this.langList && this.langList.length) {
          this.category.lang = this.category.lang || {
            name: {
              name: 'Name',
              lList: []
            },
            desc: {
              name: 'Description',
              lList: []
            },
          };
          _.forIn(this.category.lang, (langField) => {
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
        if (this.category) {
          this.toastr.info('File uploading..', 'Wait!');
          const uploadTask = this.fireDB.uploadFileToStorage(`outlet/${this.outletID}/category/${this.categoryID}/original.jpg`, event.target.files[0]);
          uploadTask.then().then((snapshot) => {
            snapshot.ref.getDownloadURL().then((imageUrl: string) => {
              if (this.category) {
                this.category.image = imageUrl;
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
      if (this.category) {
        this.fireDB.deleteFileStorage(`outlet/${this.outletID}/category/${this.categoryID}/original.jpg`);
        if (this.category && this.category.image) {
          this.category.image = '';
        }
      } else {
        this.imageFile = null;
      }
    }
  }

  addCategory(categoryForm: NgForm) {
    const value = categoryForm.form.value.name;
    if (!categoryForm.invalid) {
      if (categoryForm.form.value.lang) {
        _.forIn(categoryForm.form.value.lang, (langField) => {
          langField.lList = _.toArray(langField.lList);
        });
      }
      if (this.categoryID) {
        this.fireDB.set(`outlets/${this.outletID}/${CategoryFirePath}/${this.categoryID}`, categoryForm.form.value);
        this.toastr.success('Category Updated', 'Success!');
      } else {
        this.fireDB.add(`outlets/${this.outletID}/${CategoryFirePath}`, categoryForm.form.value)
          .then((documentRef) => {
            const categoryID = documentRef.id;
            if (this.imageFile) {
              const uploadTask = this.fireDB.uploadFileToStorage(`outlet/${this.outletID}/category/${categoryID}/original.jpg`, this.imageFile);
              this.toastr.info('File uploading..', 'Wait!');
              uploadTask.then().then((snapshot) => {
                snapshot.ref.getDownloadURL().then((imageUrl: string) => {
                  const imageUpdateData: any = {};
                  imageUpdateData['image'] = imageUrl;
                  documentRef.update(imageUpdateData);
                  this.router.navigate(['../../../menu-builder'], { relativeTo: this.route });
                  this.toastr.success('Category Created', 'Success!');
                });
              });
            } else {
              this.router.navigate(['../../../menu-builder'], { relativeTo: this.route });
              this.toastr.success('Category Created', 'Success!');
            }
          });
      }
      this.router.navigate(['../../../menu-builder'], { relativeTo: this.route });
    } else {
      this.fireDB.validateAllFormFields(categoryForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

}
