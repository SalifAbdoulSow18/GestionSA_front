import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {ProfilSortieService} from '../../../services/profil-sortie.service';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-profil-sortie',
  templateUrl: './list-profil-sortie.component.html',
  styleUrls: ['./list-profil-sortie.component.css']
})
export class ListProfilSortieComponent implements OnInit {
  status = true  ;
  statusInput = false;
  profilSorties: any;

  constructor(private profilsortieService: ProfilSortieService) {
    this.profilsortieService.getProfilSortie().subscribe(data => {
      this.profilSorties = data ;
      console.log(this.profilSorties);
    }) ;
  }

  ngOnInit(): void {
    this.profilsortieService.refresNeeded$.subscribe(() => {
      this.profilsortieService.getProfilSortie().subscribe(data => {
        this.profilSorties = data ;
      }) ;
    });
    this.profilsortieService.getProfilSortie().subscribe(data => {
      this.profilSorties = data ;
    }) ;
  }

  // tslint:disable-next-line:typedef
  AjoutProfilSortie(addProfilsorti: NgForm) {
    this.profilsortieService.addProfilSortie(addProfilsorti.value.libelle).subscribe(reponse => {
      // mes alert pour la modification!!!
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
  removeProfilSortie(id: number){
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
        this.profilsortieService.deleteProfilSortie(id).subscribe(reponse => {
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

  // La modification
  editProfilSortie(babs: any): void{
    const idLibelle = document.getElementById('profile' + babs.id);
    // @ts-ignore
    // idLibelle.style.display = 'none';
    const idInput = document.getElementById('profil' + babs.id);
    // @ts-ignore
    // idInput.style.display = 'block';
    // @ts-ignore
    if (this.statusInput === false){

      // @ts-ignore
      idLibelle.style.display = 'none';
      // @ts-ignore
      idInput.style.display = 'block';
    }
    this.statusInput = true;
  }
  // tslint:disable-next-line:typedef
  updateProfilSortie(babs: any){
    const idLibelle = document.getElementById('profile' + babs.id);
    // @ts-ignore
    // idLibelle.style.display = 'none';
    const idInput = document.getElementById('profil' + babs.id);
    if ( this.statusInput === true) {
      // @ts-ignore
      if (idInput.value.trim() === '') {
        alert('Veuillez remplir le champ');
      }else {
        // @ts-ignore

        this.profilsortieService.editProfilSortie(idInput.value, babs.id).subscribe(
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
            this.statusInput = false;
          }
        );
      }
    }
  }
}
