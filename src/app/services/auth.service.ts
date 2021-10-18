import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EventEmitter } from '@angular/core';
import { createScanner } from 'typescript';
import { LoginData } from '../login/login-data';
import { SignupData } from '../signup/signup-data';
import { FirebaseError } from '@firebase/util/dist/src/errors';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
    private db: AngularFirestore,private router:Router) {

    this.auth.authState.subscribe((user) => {
      this.userData = user;
    })
  }
  userData: any;
  errorEmitter = new EventEmitter<string>();
  //retorna usuario logado
  get user() {
    return this.auth.user;
  }

  //cadastro
  //uns no filestore  eoutros usa no cadastro
  signup({ email, password, birthdate, fullname }: SignupData) {
    this.auth.createUserWithEmailAndPassword(email, password).then((creds) => {
      // creds.user?delete //pode deletar direto
      this.sendEmailVerification(creds.user);
      creds.user?.updateProfile({ displayName: fullname })
      this.db.collection('users')
        .doc(creds.user.uid)
        .set({ birthdate, fullname }) //referencia ao documento da colecao,pode
        this.router.navigate(['/'])
    }, (err: FirebaseError) => {
      this.errorEmitter.emit(err.code)
    });

  }//signup

  //manda pro usuario opcao pra confirmar email
  sendEmailVerification(user: any) {
    if (!user?.this.sendEmailVerification()) {

    }

  }//sendemail

  login({ email, password }: LoginData) {
    this.auth.signInWithEmailAndPassword(email, password).then((creds) => {
      this.sendEmailVerification(creds.user);
      this.router.navigate(['/'])
    }, (err: FirebaseError) => {
      this.errorEmitter.emit(err.code)
    })
  }//login

  logout() {
    this.auth.signOut();
  }

}//exports
