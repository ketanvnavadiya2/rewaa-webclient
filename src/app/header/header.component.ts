import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.userSub = this.authenticationService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogOut() {
      this.authenticationService.logOut();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
