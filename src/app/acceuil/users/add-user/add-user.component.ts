import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../services/users.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  nom = '';
  prenom = '';
  email = '';
  password = '';
  passConfig = '' ;
  username = '' ;
  phone = '' ;
  address = '' ;
  type = '' ;
  photo = '' ;
  link = '' ;
  selectedFile = '';
  myForm: any = FormGroup ;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      prenom: ['', [ Validators.required]],
      nom: ['', [ Validators.required]],
      phone: ['', [ Validators.required]],
      username: ['', [ Validators.required]],
      address: ['', [ Validators.required]],
      type: ['', [ Validators.required]],
      photo: ['', [ Validators.required]],
      email: ['', [ Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(6)]],
      passConfig: ['', [ Validators.required, Validators.minLength(6)]],
    });
  }
  get f(): any {
    return this.myForm.controls;
  }
  uploadefiler(event: any): any {
    this.selectedFile =  event.target.files[0];
    if (event.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = ( event: any) => {
        this.link = event.target.result;
      };
    }
  }
  onSubmit(): any {
    this.submitted = true;
    const formValue = this.myForm.value ;
    console.log(formValue);
    const formData = new FormData();
    if (formValue.password === formValue.passConfig){
      for ( const key of Object.keys(formValue) ) {
        if (key !== 'photo'){
          const value = formValue[key];
          console.log(key, value);
          formData.append(key, value);
        }
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'le mot de passe et la comfirmation mot de passe sont differents',
      });
    }
    console.log(this.selectedFile);
    formData.append('photo', this.selectedFile);
    this.userService.addUser(formData).subscribe(reponse => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2500
        });
        setTimeout(() => {this.router.navigate(['/home', 'list-users', reponse.id]); }, 3000);
        console.log(reponse.id);
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      }
    );
    /*const formData = new FormData();
    formData.append('nom', this.myForm.value.nom);
    formData.append('prenom', this.myForm.value.prenom);
    formData.append('phone', this.myForm.value.phone);
    formData.append('address', this.myForm.value.address);
    formData.append('profil', this.myForm.value.profil);
    formData.append('file', this.myForm.value.file);
    formData.append('email', this.myForm.value.email);
    formData.append('password', this.myForm.value.password);
    formData.append('passconf', this.myForm.value.passconf);
    console.log(this.myForm);
    /!*this.userService.addUser(formData).subscribe(reponse => {
      console.log(reponse);
    });*!/*/
  }
}
