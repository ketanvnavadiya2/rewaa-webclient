import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  isLoading = false;
  isError: string = null;

  constructor(private authenticationService: AuthenticationService,
              private router: Router
    ) { 

  }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {

    if(!loginForm.valid) {
      return;
    }

    const email = loginForm.value.email;
    const password = loginForm.value.password;

    this.isLoading = true;

    this.authenticationService.login(email, password).subscribe( response => {
      console.log("Response: ", response)
      this.isLoading = false;
      this.router.navigate(['/inventory']);
    }, error => {
      console.log("Error: ",error)
      this.isLoading = false;
      this.isError = "An error occure"
    })

    loginForm.reset();

  }

}
