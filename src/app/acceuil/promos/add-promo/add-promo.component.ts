import { Component, OnInit } from '@angular/core';
import {ReferentielService} from '../../../services/referentiel.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../../services/users.service';
import Swal from 'sweetalert2';
import {PromosService} from '../../../services/promos.service';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.css']
})
export class AddPromoComponent implements OnInit {
  myReferentiel: any;
  myApprenant: any;
  dropdownList: any;
  selectedItems = [];
  dropdownSettings = {};
  myForm: any = FormGroup ;
  submitted = false;
  langue = '';
  title = '';
  fabrique = '';
  referent = '';
  agate = '';
  lieu = '';
  apprenant = '';
  description = '';
  dateDebut = '';
  dateFin = '';
  annee = '';

  constructor(private referentielService: ReferentielService,
              private userService: UsersService,
              private promoService: PromosService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    // Recuperation des referentiels
    this.referentielService.getReferentiels().subscribe(
      data => {
        // console.log(data);
        this.myReferentiel = data;
        // console.log(this.myReferentiel);
      }, error => {
        console.log(error);
      }
    );
    // Recuperation des apprenants

    this.userService.getApprenants().subscribe(
      data => {
        console.log(data);
        this.dropdownList = data;
        // console.log(this.dropdownList);
      }, error => {
        console.log(error);
      }
    );
    // la validation des champs du formulaire
    this.myForm = this.formBuilder.group({
      langue: ['', [ Validators.required]],
      title: ['', [ Validators.required]],
      description: ['', [ Validators.required]],
      fabrique: ['', [ Validators.required]],
      agate: ['', [ Validators.required]],
      referent: ['', [ Validators.required]],
      apprenant: ['', [ Validators.required]],
      dateDebut: ['', [ Validators.required]],
      dateFin: ['', [ Validators.required]],
      annee: ['', [ Validators.required]],
      lieu: ['', [ Validators.required]],
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'email',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }

  get f(): any {
    return this.myForm.controls;
  }
  onSubmit(): any {
    this.submitted = true;
    const formValue = this.myForm.value ;
    // console.log(formValue);
    const reference = {
      id: formValue.referent,
    };
    const myPromo = {
      referentiel: reference,
      libelle: formValue.title,
      dateDebut: formValue.dateDebut,
      dateFin: formValue.dateFin,
      annee: formValue.annee,
      apprenants: formValue.apprenant,
      description: formValue.description,
      lieu: formValue.lieu,
      langue: formValue.langue,
      fabrique: formValue.fabrique,
      referenceAgate: formValue.agate,
    };
    console.log(myPromo);
    this.promoService.addPromo(myPromo).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2500
        });
        setTimeout(() => {this.router.navigate(['/home', 'list-promos']); }, 3000);
        console.log('good');
      }, error => {
        console.log(error);
      }
    );
  }
}
