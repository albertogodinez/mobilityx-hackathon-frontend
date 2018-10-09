import { User } from './user.interface';
import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private user: User = new User();
  loginSubmitted = false;
  loginForm: FormGroup;
  usernameCtrl: AbstractControl;
  passwordCtrl: AbstractControl;


  constructor(
    private readonly sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {
    // Initiating the form with the fields and the required validators
    this.loginForm = this.formBuilder.group({
      'username': new FormControl('', [Validators.required]), // Name is required
      'password': new FormControl('', [Validators.required]), // Price is required and must be a positive number
    } );
    this.usernameCtrl = this.loginForm.controls['username'];
    this.passwordCtrl = this.loginForm.controls['password'];
  }

  ngOnInit() {
  }

  login() {
    console.log('logging user in');
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      console.log(this.loginForm);
    } else {
      this.sharedService.loginUser(this.loginForm.value);
    }
  }
}
