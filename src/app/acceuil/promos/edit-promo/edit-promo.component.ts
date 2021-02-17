import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReferentielService} from '../../../services/referentiel.service';
import {UsersService} from '../../../services/users.service';
import {PromosService} from '../../../services/promos.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrls: ['./edit-promo.component.css']
})
export class EditPromoComponent implements OnInit {

  idEdit: any;
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
              private route: ActivatedRoute,
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
        // console.log(data);
        this.dropdownList = data;
        // console.log(this.dropdownList);
      }, error => {
        console.log(error);
      }
    );
    // Recuperation des donnees
    this.route.params.subscribe(
      (params: Params) => {
        const id = params.id;
        this.idEdit = +id;
        // console.log(this.idEdit);
        this.promoService.getPromoById(this.idEdit).subscribe(
          data => {
            console.log(data);
            this.selectedItems = data.apprenants ;
            this.langue = data.langue ;
            this.annee = data.annee;
            this.lieu = data.lieu ;
            this.agate = data.referenceAgate;
            this.title = data.libelle;
            this.referent = data.referentiel.id;
            this.description = data.description ;
            this.fabrique = data.fabrique;
            this.dateDebut = data.dateDebut ;
            this.dateFin = data.dateFin;
          }, error => {
            console.log(error);
          }
        );
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
    this.promoService.editPromo(myPromo, this.idEdit).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2500
        });
        console.log(data);
        setTimeout(() => {this.router.navigate(['/home', 'list-promos', data.id]); }, 3000);
        console.log('good');
      }, error => {
        console.log(error);
      }
    );
  }

}
