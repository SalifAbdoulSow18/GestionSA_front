import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../services/authentification.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  // @ts-ignore
  formLogin: FormGroup;
  submitted = false;

  constructor(private authService: AuthentificationService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.formLogin.controls;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    this.authService.login(this.email, this.password).subscribe(data => {
        console.log(data);
      }, (error) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Oops...',
        text: 'login or password incorrect!',
      });
      }
    );
  }
}
