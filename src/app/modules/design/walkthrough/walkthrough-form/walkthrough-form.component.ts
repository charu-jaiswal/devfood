import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { AppWalkthroughFirePath } from '../../../firestore.path';
import { WalkThrough } from '../../walkthrough/walkthrough.model';
import * as _ from 'lodash';

@Component({
  selector: 'brand-walkthrough-form',
  templateUrl: './walkthrough-form.component.html',
  styleUrls: ['./walkthrough-form.component.css'],
})
export class WalkthroughFormComponent implements OnInit {
  walkthrough: WalkThrough;
  bigIconFile: File | null;
  walkThroughID: string | null;
  bgColor = '#ffffff';
  titleColor = '#ffffff';
  descColor = '#ffffff';
  constructor(public fireDB: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.walkThroughID = this.route.snapshot.paramMap.get('id');
    if (this.walkThroughID) {
      const FbDbSubscribe = this.fireDB.doc$(`${AppWalkthroughFirePath}/${this.walkThroughID}`).subscribe((walkthroughData: WalkThrough) => {
        const walkthroughColor = _.get(walkthroughData, 'color.bg', null);
        const walkthroughTitle = _.get(walkthroughData, 'color.title', null);
        const walkthroughDesc = _.get(walkthroughData, 'color.desc', null);
        if (walkthroughColor) {
          this.bgColor = walkthroughColor;
        }
        if (walkthroughTitle) {
          this.titleColor = walkthroughTitle;
        }
        if (walkthroughDesc) {
          this.descColor = walkthroughDesc;
        }
        this.walkthrough = walkthroughData;
        FbDbSubscribe.unsubscribe();
      });
    } else {
      this.walkthrough = {};
    }
  }

  uploadFile(event: any, type: string) {
    if (event && type) {
      if (type === 'image') {
        if (this.walkThroughID) {
          this.toastr.info('File uploading..', 'Wait!');
          const uploadTask = this.fireDB.uploadFileToStorage(`brand/appWalkThrough/${this.walkThroughID}/original.jpg`, event.target.files[0]);
          uploadTask.then().then((snapshot) => {
            snapshot.ref.getDownloadURL().then((imageUrl: string) => {
              if (this.walkthrough) {
                this.walkthrough.image = imageUrl;
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
      if (this.walkThroughID) {
        this.fireDB.deleteFileStorage(`brand/appWalkThrough/${this.walkThroughID}/original.jpg`);
        if (this.walkthrough && this.walkthrough.image) {
          this.walkthrough.image = '';
        }
      } else {
        this.bigIconFile = null;
      }
    }
  }

  addWalkThrough(walkThroughForm: any) {
    if (!walkThroughForm.invalid) {
      if (this.walkThroughID) {
        this.fireDB.set(`${AppWalkthroughFirePath}/${this.walkThroughID}`, walkThroughForm.form.value);
        this.toastr.success('Walk Through Updated', 'Success!');
      } else {
        this.fireDB.add(AppWalkthroughFirePath, walkThroughForm.form.value)
          .then((documentRef) => {
            const walkThroughID = documentRef.id;
            if (this.bigIconFile) {
              const uploadTask = this.fireDB.uploadFileToStorage(`brand/appWalkThrough/${walkThroughID}/original.jpg`, this.bigIconFile);
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
        this.toastr.success('Walk Through Created', 'Success!');
      }
      this.router.navigate(['/design/walk-through/list']);
    } else {
      this.fireDB.validateAllFormFields(walkThroughForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }
  onChangeColor(value: any, walkthroughForm: any, type: string) {
    this.bgColor = value;
    if (type === 'walkthroughColor') {
      console.log(value);
      walkthroughForm.form.value.color.bg = value;
    }

  }
  onChangeTitle(value: any, walkthroughForm: any, type: string) {
    this.titleColor = value;
    if (type === 'walkthroughTitle') {
      walkthroughForm.form.value.color.title = value;
    }
  }
  onChangeDesc(value: any, walkthroughForm: any, type: string) {
    this.descColor = value;
    if (type === 'walkthroughDesc') {
      walkthroughForm.form.value.color.desc = value;
    }
  }
}
