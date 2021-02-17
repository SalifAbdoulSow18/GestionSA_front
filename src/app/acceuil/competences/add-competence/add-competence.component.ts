/* tslint:disable:quotemark object-literal-key-quotes */
import { Component, OnInit } from '@angular/core';
import {ListItem} from 'ng-multiselect-dropdown/multiselect.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GrpComprtenceService} from '../../../services/grp-comprtence.service';
import {CompetencesService} from '../../../services/competences.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-competence',
  templateUrl: './add-competence.component.html',
  styleUrls: ['./add-competence.component.css']
})
export class AddCompetenceComponent implements OnInit {

  nomCompetence = '';
  critereAction1 = '';
  critereAction2 = '';
  critereAction3 = '';
  critereEvaluation3 = '';
  critereEvaluation2 = '';
  critereEvaluation1 = '';
  myForm: any = FormGroup ;
  submitted = false;
  // tslint:disable-next-line:ban-types
  dropdownList: any;
  selectedItems = [];
  dropdownSettings = {};
  constructor(private formBuilder: FormBuilder,
              private grpCompetenceService: GrpComprtenceService,
              private competenceService: CompetencesService,
              private router: Router
  ) { }

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
      gprCompetence: ['', [ Validators.required]],
      nomCompetence: ['', [ Validators.required]],
      critereAction1: ['', [ Validators.required]],
      critereAction2: ['', [ Validators.required]],
      critereAction3: ['', [ Validators.required]],
      critereEvaluation1: ['', [ Validators.required]],
      critereEvaluation2: ['', [ Validators.required]],
      critereEvaluation3: ['', [ Validators.required]],
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
  onItemSelect($event: ListItem) {
  }

  // tslint:disable-next-line:typedef
  onSelectAll($event: Array<ListItem>) {
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    const formValue = this.myForm.value ;
    // console.log(formValue);
    const niveaux = [
      {
        "level": "niveau 1",
        "groupeAction": formValue.critereAction1,
        "critereEvaluation": formValue.critereEvaluation1
      },

      {
        "level": "niveau2",
        "groupeAction": formValue.critereAction2,
        "critereEvaluation": formValue.critereEvaluation2
      },

      {
        "level": "niveau3",
        "groupeAction": formValue.critereAction3,
        "critereEvaluation": formValue.critereEvaluation3
      }
    ];
    const myCompetence = {
      "nomCompetence": formValue.nomCompetence,
      "groupeCompetence": formValue.gprCompetence,
      "niveaux" : niveaux,
    };
    // console.log(myCompetence);
    this.competenceService.addCompetence(myCompetence).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2500
        });
        setTimeout(() => {this.router.navigate(['/home', 'list-competences']); }, 3000);
        console.log('good');
      }, error => {
        console.log(error);
      }
    );
    /*const formData = new FormData();
    for ( const key of Object.keys(formValue) ) {
        const value = formValue[key];
        console.log(key, value);
        formData.append(key, value);
    }*/
  }
}
