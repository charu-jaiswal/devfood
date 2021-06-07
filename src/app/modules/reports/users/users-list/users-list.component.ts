import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../../../core/firestore.service';
import { Users } from '../users.model';
import { UsersListService } from './users-list.services';
import { AuthService } from './../../../../core/auth.service';
import * as FileSaver from 'file-saver';
import * as _ from 'lodash';

@Component({
  selector: 'brand-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  selUser: Users;
  reportsList: any;
  response: any = {
    limit: 0,
    page: 0,
    pages: 0,
  };
  loading: Boolean;
  dataPost: any;
  timeout: any = undefined;
  digitNum: any = '1.1-2';

  constructor(
    private reportListService: UsersListService,
    public fireDB: FirestoreService,
    public toastr: ToastrService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.reportsList = [];
    this.dataPost = {
      name: '',
      email: '',
      uid: '',
      pageNo: 1,
      pageSize: 10,
      restaID: this.auth.restaID,
    };
    this.loadList();
  }

  loadList() {
    this.reportsList = [];
    this.dataPost.pageSize = parseInt(this.dataPost.pageSize, 10);
    this.loading = true;
    this.reportListService.getUserListData(this.dataPost).subscribe((response: any) => {
      const result = JSON.parse(response._body);
      if (result.status) {
        if (result.data !== undefined) {
          this.response = result.pagination;
          this.reportsList = result.data;
        }
      } else {
        alert(result.statusText);
      }
      this.loading = false;
    });
  }

  onPaginationChange(page: any) {
    this.loading = true;
    this.dataPost.pageNo = page;
    this.loadList();
  }

  onSearch() {
    this.dataPost.pageNo = 1;
    if (this.timeout !== undefined) {
      clearInterval(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.loading = true;
      this.loadList();
    }, 1000);
  }

  exportData() {
    const querry = { ...this.dataPost };
    querry['format'] = 'csv';
    this.reportListService.getUserListData(querry).subscribe((response: any) => {
      const blob = new Blob([response._body], { type: 'text/csv' });
      const filename = 'customer-report.csv';
      FileSaver.saveAs(blob, filename);
    });
  }

  printOrder() {
    window.print();
  }

  viewCustomer(id: any) {
    this.router.navigate(['/reports/customer', id]);
  }
}
