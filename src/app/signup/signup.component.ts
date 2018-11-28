import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  pwd: string;
  name: string;
  //description: string;


  constructor(private auth: AuthService,
  ) { }

  register() {
    this.auth.signup(this.email, this.pwd, this.name);
    console.log(this.email);
    console.log(this.pwd);
    // this.authService.registerUser(this.registerData)
  }


  ngOnInit() {
  }

}
