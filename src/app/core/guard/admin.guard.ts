import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './../auth.service';
import { get, indexOf } from 'lodash';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map((user: any) => {
        // console.log(user);
        if (!user) {
          // console.log('User undefined');
          this.router.navigate(['/auth/login']);
          return false;
        } else if (this.auth.isSubAdmin(user)) {
          // this.router.navigate(['/outlet/outlets']);
          return true;
        } else if (this.auth.isLimitedAdmin(user)) {
          if ((indexOf(get(user, 'accessPages', []), state.url) >= 0)
            || (indexOf(get(user, 'accessPages', []), ('/' + state.url.split('/')[1] + '/*')) >= 0)
            || (indexOf(get(user, 'accessPages', []), ('/' + state.url.split('/')[1] + '/' + state.url.split('/')[2] + '/*')) >= 0)
          ) {
            return true;
          } else {
            this.router.navigate([get(user, 'accessPages[0]', '/auth/404')]);
            return false;
          }
        } else if (!this.auth.isAdmin(user)) {
          // console.log('User not is admin');
          this.auth.signOut();
          this.router.navigate(['/']);
          return false;
        } else if (!user.brandSetup) {
          this.router.navigate(['/brand/brands/setting']);
          return false;
        } else if (!user.globalSetup) {
          this.router.navigate(['/brand/global-setting/setting']);
          return false;
        }
        return true;
      }),
    );
  }
}
