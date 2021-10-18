import { AuthService } from '../services/auth.service';
import { SignupData } from './signup-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent{
  data: SignupData = {} as SignupData;

  signupError: string = '';

  onSubmit() {
    this.authService.signup(this.data);
  }

  constructor(private authService: AuthService) {
    this.authService.errorEmitter.subscribe((msg) => (this.signupError = msg));
  }
}
