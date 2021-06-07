import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './../auth.service';
import { get, indexOf } from 'lodash';

@Injectable()
export class AdminRedirectGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.auth.user.pipe(
      take(1),
      map((user) => {
        if (!user) {
          this.router.navigate(['/auth/login']);
          return false;
        } else if (this.auth.isLimitedAdmin(user)) {
          if (indexOf(get(user, 'accessPages', []), state.url) >= 0) {
            return true;
          } else {
            this.router.navigate([get(user, 'accessPages[0]', '/auth/404')]);
            return false;
          }
        } else if (!this.auth.isAdmin(user)) {
          this.auth.signOut();
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }),

    );
  }
}
