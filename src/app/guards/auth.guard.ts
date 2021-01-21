import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let flag = this.isSessionCheck();

    if (!flag) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }

    return flag;

  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let flag = this.isSessionCheck();

    if (!flag) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }

    return flag;
  }

  isSessionCheck(): boolean {
    let result: boolean = false;
    if (localStorage.getItem('currentUser')) {
      // const users = ['106899', '106361', '110194', '10106354'];
      // logged in so return true
      let user = JSON.parse(localStorage.getItem('currentUser'));
      // if (users.includes(user.userAccount)) {
      //   return true;
      // }
      let loginTime = user.loginTime;
      let t = Date.now() - +(new Date(loginTime));
      let aliveTime = environment.aliveTime;
      // 5sec
      if (t >= aliveTime * 1000) {
        localStorage.removeItem('currentUser');
      }
      else {
        // loginTime update
        user.loginTime = Date.now();
        localStorage.setItem('currentUser', JSON.stringify(user));
        result = true;
      }
      // this.http.get('/api/authenticate/token/' + user.token)
      //     .toPromise()
      //         .then(
      //             res => {
      //                 if (res) {
      //                     user.loginTime = Date.now();
      //                     localStorage.setItem('currentUser', JSON.stringify(user));
      //                     result = true;

      //                 }
      //             }
      //         );
    }
    return result;
  }

}
