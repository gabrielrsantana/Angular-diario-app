import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
    private db: AngularFirestore) {

    this.auth.authState.subscribe((user) => {
      this.userData = user;
    })
  }
  userData: any;
  //retorna usuario logado
  get user(){
    return this.auth.user;
  }




}//exports
