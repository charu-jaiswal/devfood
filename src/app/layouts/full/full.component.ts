import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthService } from '../../core/auth.service';
import { FirestoreService } from '../../core/firestore.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent implements OnInit {
  @ViewChild('content') content: any;
  color = 'green';
  showSettings = false;
  showMinisidebar = false;
  showDarktheme = false;
  showHorizontalNav = true;
  showBoxedtheme = true;
  user: any;
  public config: PerfectScrollbarConfigInterface = {};
  hiddenBar: Boolean = false;
  adminPopupConf: any;

  constructor(
    public router: Router,
    public auth: AuthService,
    public fireDB: FirestoreService,
    private modalService: NgbModal,
    private configModal: NgbModalConfig,
  ) {
    this.auth.user.subscribe((userData: any) => {
      if (userData && this.auth.isSubAdmin(userData)) {
        this.hiddenBar = true;
      }
    });
  }

  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   const x = event.keyCode;
  //   if (x === 27) {
  //   }
  // }

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/auth/404']);
    }
    this.fireDB.doc$(`setting/adminConf`).subscribe((response: any) => {
      // console.log(response);
      this.modalService.dismissAll();
      this.adminPopupConf = response.adminPopup;
      if (this.adminPopupConf && this.adminPopupConf.adminPopupConf) {
        this.modalService.open(this.content, { size: 'lg', backdrop: 'static', windowClass: 'modal-xxl', keyboard: this.adminPopupConf.closeable });
      }
    });
  }

  goto(link: any) {
    window.location.href = link;
  }

}
