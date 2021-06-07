import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toArray } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from '../../../../core/firestore.service';
import { NotificationFirePath } from '../../../firestore.path';
import { Notification, defaultNotification, listTag } from '../notification.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'brand-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
  notify: any;
  quillToolbar: any;
  gloItem: any;
  gloTitle: string;
  gloType: string;
  listTag: any;

  constructor(
    public fireDB: FirestoreService,
    public toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.listTag = listTag;
    const obs = this.fireDB.doc$(`${NotificationFirePath}`).subscribe((notificationData: Notification) => {
      console.log(notificationData);
      if (notificationData) {
        this.notify = notificationData;
        if (!notificationData.driver) {
          this.notify.driver = defaultNotification.driver
        }
      } else {
        this.fireDB.doc(`${NotificationFirePath}`).set(defaultNotification);
        this.notify = defaultNotification;
      }
      obs.unsubscribe();
    });
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
  }

  updateNotification(NotificationForm: any) {
    console.log(NotificationForm);
    if (!NotificationForm.invalid) {
      if (NotificationForm.form.value.aggregator) {
        NotificationForm.form.value.aggregator = toArray(NotificationForm.form.value.aggregator);
      }
      if (NotificationForm.form.value.owner) {
        NotificationForm.form.value.owner = toArray(NotificationForm.form.value.owner);
      }
      if (NotificationForm.form.value.user) {
        NotificationForm.form.value.user = toArray(NotificationForm.form.value.user);
      }
      this.fireDB.set(NotificationFirePath, NotificationForm.form.value);
      this.toastr.success('Notification Updated', 'Success!');
    } else {
      this.fireDB.validateAllFormFields(NotificationForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

  updateItemNotification(notificationItemForm: any) {
    console.log(notificationItemForm, this.gloItem, this.gloType);
    if (!notificationItemForm.invalid) {
      if (notificationItemForm.form.value.aggregator) {
        notificationItemForm.form.value.aggregator = toArray(notificationItemForm.form.value.aggregator);
      }
      if (notificationItemForm.form.value.owner) {
        notificationItemForm.form.value.owner = toArray(notificationItemForm.form.value.owner);
      }
      if (notificationItemForm.form.value.user) {
        notificationItemForm.form.value.user = toArray(notificationItemForm.form.value.user);
      }
      for (let index = 0; index < this.notify[this.gloType].length; index++) {
        const element = this.notify[this.gloType][index];
        if (element.id === this.gloItem.id) {
          this.notify[this.gloType][index] = this.gloItem;
          break;
        }
      }
      // console.log('send', this.notify);
      setTimeout(() => {
        this.fireDB.update(NotificationFirePath, this.notify)
          .then(() => {
            this.toastr.success('Notification Updated', 'Success!');
            this.modalService.dismissAll();
            this.ngOnInit();
          })
          .catch((err) => {
            this.toastr.error(err, 'Error!');
            this.ngOnInit();
          });
      }, 1);
    } else {
      this.fireDB.validateAllFormFields(notificationItemForm.form);
      this.toastr.error('Fill up the form correctly!', 'Error!');
    }
  }

  updateStatus(NotificationForm: any) {
    // console.log(this.notify, NotificationForm);
    setTimeout(() => {
      this.fireDB.update(NotificationFirePath, this.notify)
        .then(() => {
          this.toastr.success('Notification Updated', 'Success!');
        })
        .catch((err) => {
          this.toastr.error(err, 'Error!');
          this.ngOnInit();
        });
    }, 1);
  }

  viewDetails(content: any, item: any, title: string, obj: any) {
    console.log(item);
    this.gloType = obj;
    this.gloItem = item;
    this.gloTitle = title;
    this.modalService.open(content, { size: 'lg' });
  }

  closeModal() {
    this.ngOnInit();
    this.modalService.dismissAll();
  }
}
