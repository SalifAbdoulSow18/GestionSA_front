import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListItem} from 'ng-multiselect-dropdown/multiselect.model';
import {GrpComprtenceService} from '../../../services/grp-comprtence.service';
import {ReferentielService} from '../../../services/referentiel.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-referentiel',
  templateUrl: './add-referentiel.component.html',
  styleUrls: ['./add-referentiel.component.css']
})
export class AddReferentielComponent implements OnInit {

  groupeCompetence = '' ;
  libelle = '' ;
  presentation = '' ;
  programme = '' ;
  selectedFile = '' ;
  critereEvaluation = '' ;
  critereAdmission = '' ;
  myForm: any = FormGroup ;
  submitted = false;
  groupeCompetences = '';
  // tslint:disable-next-line:ban-types
  dropdownList: any;
  selectedItems = [];
  dropdownSettings = {};
  constructor(private formBuilder: FormBuilder,
              private grpCompetenceService: GrpComprtenceService,
              private referentielService: ReferentielService,
              private router: Router) { }

  ngOnInit(): void {
    this.grpCompetenceService.getGrpCompetences().subscribe(
      data => {
        console.log(data);
        this.dropdownList = data;
      }, error => {
        console.log(error);
      }
    );
    this.myForm = this.formBuilder.group({
      groupeCompetence: ['', [ Validators.required]],
      libelle: ['', [ Validators.required]],
      presentation: ['', [ Validators.required]],
      programme: ['', [ Validators.required]],
      critereEvaluation: ['', [ Validators.required]],
      critereAdmission: ['', [ Validators.required]],
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'libelle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }

  get f(): any {
    return this.myForm.controls;
  }
  // tslint:disable-next-line:typedef
  /*onSubmit1() {
    this.submitted = true;
    const formValue = this.myForm.value ;
    console.log(formValue);
    const myReferentiel = {
      libelle: formValue.libelle,
      groupeCompetences: formValue.gprCompetence,
      programme : formValue.programme,
      presentation: formValue.presentation,
      critereEvaluation: formValue.critereEvaluation,
      critereAdmission : formValue.critereAdmission,
    };
    console.log(myReferentiel);
    this.referentielService.addReferentiel(myReferentiel).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2500
        });
        setTimeout(() => {this.router.navigate(['/home', 'list-referentiels']); }, 3000);
        console.log('good');
      }, error => {
        console.log(error);
      }
    );
  }*/
  uploadefiler(event: any): any {
    this.selectedFile =  event.target.files[0];
  }

  onSubmit(): any {
    this.submitted = true;
    const formValue = this.myForm.value ;
    // console.log(formValue);
    const formData = new FormData();
    for ( const key of Object.keys(formValue) ) {
      if (key !== 'programme' && key !== 'groupeCompetence'){
        const value = formValue[key];
        // console.log(key, value);
        formData.append(key, value);
      }
    }
    for (const groupC of formValue.groupeCompetence) {
      this.groupeCompetences += groupC.id + ',';
    }
    console.log(this.groupeCompetences);
    // console.log(this.selectedFile);

    formData.append('groupeCompetence', this.groupeCompetences);
    formData.append('programme', this.selectedFile);
    this.referentielService.addReferentiel(formData).subscribe(reponse => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2500
        });
        setTimeout(() => {this.router.navigate(['/home', 'list-referentiels']); }, 3000);
        console.log(reponse);
      }, (error) => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  onItemSelect($event: ListItem) {}

  // tslint:disable-next-line:typedef
  onSelectAll($event: Array<ListItem>) {}
}
