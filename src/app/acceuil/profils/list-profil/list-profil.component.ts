import { Component, OnInit } from '@angular/core';
import {ProfilsService} from '../../../services/profils.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.component.html',
  styleUrls: ['./list-profil.component.css']
})
export class ListProfilComponent implements OnInit {
  formGroup: FormGroup | any;
  status = true ;
  bo = false;
  profils: any;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private profilService: ProfilsService) {
    this.profilService.getProfil().subscribe(data => {
      this.profils = data;
      console.log(data);
    }) ;
  }

  ngOnInit(): void {
    // refresh table
    this.profilService.refresNeeded$.subscribe(() => {
      this.profilService.getProfil().subscribe(data => {
        this.profils = data;
      }) ;
    });
    this.profilService.getProfil().subscribe(data => {
      this.profils = data;
      console.log(data);
    }) ;
  }
  editProfil(babs: any): void{
     const idLibelle = document.getElementById('profile' + babs.id);
    // @ts-ignore
    // idLibelle.style.display = 'none';
     const idInput = document.getElementById('profil' + babs.id);
    // @ts-ignore
    // idInput.style.display = 'block';
    // @ts-ignore
     if (this.bo === false){

      // @ts-ignore
      idLibelle.style.display = 'none';
      // @ts-ignore
      idInput.style.display = 'block';
    }
     this.bo = true;
  }
  // tslint:disable-next-line:typedef
  updateProfil(babs: any){
    const idLibelle = document.getElementById('profile' + babs.id);
  // @ts-ignore
  // idLibelle.style.display = 'none';
    const idInput = document.getElementById('profil' + babs.id);
    /*alert(this.bo);*/
    if ( this.bo === true) {
      // @ts-ignore
      if (idInput.value.trim() === '') {
         alert('Veuillez remplir le champ');
      }else {
        // @ts-ignore

        this.profilService.editProfil(idInput.value, babs.id).subscribe(
          data => {

            // mes alert pour la modification!!!
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            });
            // @ts-ignore
            idLibelle.innerText = idInput.value ;
            // @ts-ignore
            idLibelle.style.display = 'block';
            // @ts-ignore
            idInput.style.display = 'none';
            this.bo = false;
          }
        );
      }
    }
}

  // tslint:disable-next-line:typedef
  AjoutProfil(addProfil: NgForm) {
    // @ts-ignore
    // console.log((addProfil.value.libelle)) ;
    this.profilService.addProfil(addProfil.value.libelle).subscribe(reponse => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      });
      console.log(reponse);
    }, error =>
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    );
  }
  // tslint:disable-next-line:typedef
  removeProfil(id: number){
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profilService.deleteProfil(id).subscribe(reponse => {
          console.log(reponse);
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }
}
