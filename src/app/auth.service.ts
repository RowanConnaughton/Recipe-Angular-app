import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import 'rxjs/add/operator/switchMap'
import { UserService } from './user.service';
import 'rxjs/add/observable/of';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private success: boolean;

  constructor(private userService: UserService, private router: Router, private notifier: NotificationService, private afAuth: AngularFireAuth, private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;
  }

  signup(email: string, password: string, name: string) {
    // clear all messages
    this.notifier.display(false, '');
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.sendEmailVerification();
        const message = 'A verification email has been sent, please check your email and follow the steps!';
        this.notifier.display(true, message);
        return firebase.database().ref('users/' + res.uid).set({
          email: res.email,
          uid: res.uid,
          registrationDate: new Date().toString(),
          name: name
        })
          .then(() => {
            firebase.auth().signOut();
            this.router.navigate(['login']);
          });
      })
      .catch(err => {
        console.log(err);
        this.notifier.display(true, err.message);
      });
    // this.authService.registerUser(this.registerData)
  }

  loginEmail(email: string, password: string) {
    let returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
   
    // clear all messages
    this.notifier.display(false, '');
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.emailVerified) {
          this.router.navigate(['recipes']);
          // Redirect the user here
        } else {
          const message = 'A verification email has been sent, please check your email and follow the steps!';
          this.notifier.display(true, message);
        }
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.notifier.display(true, err.message);
      });
  }

  login(){
  let returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  sendEmailVerification() {
    this.afAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        });
    });
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return  this.user$
  .switchMap(user =>  {
    if(user)
    return this.userService.get(user.uid);
    
    return Observable.of(null);
  });
  }

}
