import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  import { AuthenticationService } from './authentication.service';
  
  @Injectable({ providedIn: 'root' })

  export class AuthenticationGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      router: RouterStateSnapshot
    ):
      | boolean
      | Promise<boolean | UrlTree>
      | Observable<boolean | UrlTree> {
      return this.authService.user.pipe(
        map(user => {
          const isAuth = !!user;
          if (isAuth) {
            return true;
          } else {
             this.router.navigate(['/auth']);
             return false;
          }
        })
      );
    }
  }
  