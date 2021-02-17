/* tslint:disable:object-literal-key-quotes */
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GrpComprtenceService} from '../../../services/grp-comprtence.service';
import {CompetencesService} from '../../../services/competences.service';
import {ListItem} from 'ng-multiselect-dropdown/multiselect.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-competence',
  templateUrl: './edit-competence.component.html',
  styleUrls: ['./edit-competence.component.css']
})
export class EditCompetenceComponent implements OnInit {

  idEdit: any ;
  nomCompetence = '';
  idNiveau1: any ;
  idNiveau2: any ;
  idNiveau3: any ;
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
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const id = params.id;
        this.idEdit = +id;
        this.competenceService.getCompetencesById(this.idEdit).subscribe(
          data => {
            console.log(data);
            this.selectedItems = data.groupeCompetence ;
            this.nomCompetence = data.nomCompetence;
            this.idNiveau1 = data.niveaux[0].id;
            this.idNiveau2 = data.niveaux[1].id;
            this.idNiveau3 = data.niveaux[2].id;
            this.critereAction1 = data.niveaux[0].groupeAction;
            this.critereAction2 = data.niveaux[1].groupeAction;
            this.critereAction3 = data.niveaux[2].groupeAction;
            this.critereEvaluation1 = data.niveaux[0].critereEvaluation;
            this.critereEvaluation2 = data.niveaux[1].critereEvaluation;
            this.critereEvaluation3 = data.niveaux[2].critereEvaluation;
          }, error => {
            console.log(error);
          }
        );
      }
        );

    this.grpCompetenceService.getGrpCompetences().subscribe(
      data => {
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
        'id': this.idNiveau1,
        'level': 'niveau 1',
        'groupeAction': formValue.critereAction1,
        'critereEvaluation': formValue.critereEvaluation1
      },

      {
        'id': this.idNiveau2,
        'level': 'niveau2',
        'groupeAction': formValue.critereAction2,
        'critereEvaluation': formValue.critereEvaluation2
      },

      {
        'id': this.idNiveau3,
        'level': 'niveau3',
        'groupeAction': formValue.critereAction3,
        'critereEvaluation': formValue.critereEvaluation3
      }
    ];
    const myCompetence = {
      'nomCompetence': formValue.nomCompetence,
      'groupeCompetence': formValue.gprCompetence,
      'niveaux' : niveaux,
    };
    // console.log(myCompetence);
    this.competenceService.editCompetence(myCompetence, this.idEdit).subscribe(
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
  }

}
