import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../../services/users.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  idEdit: any;
  nom = '';
  prenom = '';
  email = '';
  password = '';
  username = '' ;
  phone = '' ;
  address = '' ;
  photo = '' ;
  link = '' ;
  selectedFile = '';
  myForm: any = FormGroup ;
  submitted = false;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params.id;
        this.idEdit = +id;
        console.log(this.idEdit);
        this.userService.getUserById(this.idEdit).subscribe(
          data => {
            console.log(data);
            this.nom = data.nom ;
            this.prenom = data.prenom;
            this.username = data.username ;
            this.password = data.password;
            this.email = data.email;
            this.phone = data.phone ;
            this.photo = data.photo;
          }, error => {
            console.log(error);
          }
        );
      }
    );

    this.myForm = this.formBuilder.group({
      prenom: ['', [ Validators.required]],
      nom: ['', [ Validators.required]],
      phone: ['', [ Validators.required]],
      username: ['', [ Validators.required]],
      email: ['', [ Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(6)]],
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
    const idp = this.route.snapshot.params.id;
    const formValue = this.myForm.value;
    console.log(formValue);
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      if (key !== 'photo') {
        const value = formValue[key];
        console.log(key, value);
        formData.append(key, value);
      }
    }
    // console.log(this.selectedFile);
    if (this.selectedFile !== '') {
      formData.append('photo', this.selectedFile);
    }
    formData.append('_method', 'PUT');


    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userService.editUser(formData, idp).subscribe(reponse => {
            Swal.fire('Saved!', '', 'success');
            setTimeout(() => {this.router.navigate(['/home', 'list-users', reponse.id]); }, 3000);
            console.log(reponse);
          }, (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
            console.log(error);
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
