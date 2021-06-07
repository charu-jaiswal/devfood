import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/auth.service';
import URL from '../../../../shared/url';
import { Http } from '@angular/http';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'outlet-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.css'],
})
export class MenuBuilderComponent implements OnInit {
  searchModalText = '';
  outletID: string | null;
  importOutletCSVFile: File | null = null;
  loading: Boolean = false;
  categorySelected: String;
  searchResult: any = [];
  searchLoading = false;
  @ViewChild('uploadCSVInput') uploadCSVInput: ElementRef;

  constructor(private router: Router,
    public toastr: ToastrService,
    public auth: AuthService,
    private http: Http,
    private route: ActivatedRoute) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url.split('/')[4] === 'menu-builder') {
          this.ngOnInit();
        }
      }
    });
  }

  ngOnInit() {
    this.outletID = this.route.pathFromRoot[this.route.pathFromRoot.length - 2].snapshot.paramMap.get('outletid');
  }

  onCategorySelection($event: any) {
    this.categorySelected = $event;
    this.clearItemSearch();
  }

  uploadCSVFile() {
    if (this.importOutletCSVFile) {
      const fileReader = new FileReader();
      fileReader.readAsText(this.importOutletCSVFile);
      this.loading = true;
      fileReader.onload = (e) => {
        this.http.post(URL.importOutletMenuCSV, {
          csv: fileReader.result,
          outletID: this.outletID,
          restaID: this.auth.restaID,
          uid: this.auth.userDetail.uid,
        }).subscribe((response: any) => {
          const result = JSON.parse(response._body);
          if (result.success) {
            this.importOutletCSVFile = null;
            this.uploadCSVInput.nativeElement.value = '';
            this.toastr.success('Items imported', 'Success!');
          } else {
            this.importOutletCSVFile = null;
            this.uploadCSVInput.nativeElement.value = '';
            this.toastr.success(result.message, 'Success!');
          }
          this.loading = false;
        });
      };
    } else {
      this.toastr.error('Please upload csv file.', 'Error!');
    }
  }

  doItemSearch(searchText: any) {
    if (searchText) {
      this.searchLoading = true;
      this.http.post(URL.searchMenuItemInApp, {
        outletID: this.outletID,
        restaID: this.auth.restaID,
        name: searchText
      }).subscribe((response: any) => {
        this.searchLoading = false;
        this.searchResult = JSON.parse(response._body);
      });
    } else {
      this.clearItemSearch();
    }
  }

  clearItemSearch() {
    this.searchModalText = '';
    this.searchResult = [];
  }

  downloadCSVFile() {
    this.loading = true;
    this.http.post(URL.exportOutletMenuCSV, {
      outletID: this.outletID,
      restaID: this.auth.restaID,
      uid: this.auth.userDetail.uid,
    }).subscribe((response: any) => {
      const blob = new Blob([response._body], { type: 'text/csv' });
      const filename = 'item.csv';
      FileSaver.saveAs(blob, filename);
      this.loading = false;
    });
  }

  changeFileUpload(event: any, type: string) {
    if (event && type && type === 'csvimport') {
      this.importOutletCSVFile = event.target.files[0];
    } else {
      this.toastr.error('Invalid File!', 'Error!');
    }
  }
}
