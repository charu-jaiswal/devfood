import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  constructor(public auth: AuthService, private router: Router, public toastr: ToastrService) {
    // console.log(this.auth.user);
    this.auth.user.subscribe((userData: any) => {
      // console.log(userData, this.auth.roleUser);
      if (!userData && this.auth.roleUser === 'admin' && this.auth.userData) {
        // console.log('/outlet/outlets');
        this.auth.setRole('subadmin');
        this.router.navigate(['/outlet/outlets']);
      } else if (userData && this.auth.roleUser === 'subadmin') {
        // console.log('/outlet/outlets');
        this.router.navigate(['/outlet/outlets']);
      } else if (userData && !userData.brandSetup) {
        // console.log('/brand/brands/setting');
        this.router.navigate(['/brand/brands/setting']);
      } else if (userData) {
        // console.log('/reports/main');
        this.router.navigate(['/reports/main']);
      } else {
        // console.log('nowhere');
      }
    });
  }

  ngAfterViewInit() {
    $(() => {
      $('.preloader').fadeOut();
    });
    $('#to-recover').on('click', () => {
      $('#loginform').slideUp();
      $('#recoverform').fadeIn();
    });
    $('#to-recover-close').on('click', () => {
      $('#recoverform').fadeOut();
      $('#loginform').slideDown();
    });
  }

  login(loginForm: any) {
    this.auth
      .emailLogin(
        loginForm.form.value['email'],
        loginForm.form.value['password'],
      )
      .then((res: any) => this.afterSignIn(res))
      .catch((error) => this.toastr.error(error.message, 'Error!'));
  }

  resetPassword(passwordForm: any) {
    this.auth
      .resetPassword(passwordForm.form.value['passEmail'])
      .then(() => {
        $('#to-recover-close').click();
      })
      .catch((error: any) => this.toastr.error(error.message, 'Error!'));
  }

  private afterSignIn(res: any) {
    // console.log(res, this.auth, this.auth.user);
    this.toastr.success('You are loggedin successfully.', 'Success!');
    // this.router.navigate(['/reports/main']);
  }
}
