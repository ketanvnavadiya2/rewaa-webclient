import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  user = new BehaviorSubject<User>(null);


    constructor(private http: HttpClient, private router: Router) {}

    login(email: string, password: string) {
        return this.http
          .post(
            'http://localhost:8080/auth/login',
            {
              email: email,
              password: password,
            }
          ).pipe(
            tap(resData => {
              if (!resData['success']) {
                return;
              }
              this.handleAuthentication(
                resData['email'],
                resData['userId'],
                resData['idToken'],
                +resData['expiresIn']
              );
            })
          );
    }

    autoLogin() {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return;
      }
  
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
  
      if (loadedUser.token) {
        this.user.next(loadedUser);
        this.router.navigate(['/inventory']);
      }
    }

    logOut() {
      this.user.next(null);
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    }


      private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      }

}