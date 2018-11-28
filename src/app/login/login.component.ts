import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  email: string;
  password: string;

  constructor(private auth: AuthService ) { }

  loginEmail() {
    this.auth.loginEmail(this.email, this.password);}

  login(){
    this.auth.login();
  }

}
