import { Component, OnInit } from '@angular/core';
import {ListItem} from 'ng-multiselect-dropdown/multiselect.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompetencesService} from '../../../services/competences.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GrpComprtenceService} from '../../../services/grp-comprtence.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-grp-competence',
  templateUrl: './edit-grp-competence.component.html',
  styleUrls: ['./edit-grp-competence.component.css']
})
export class EditGrpCompetenceComponent implements OnInit {

  idEdit: any ;
  competence = '' ;
  libelle = '' ;
  description = '' ;
  myForm: any = FormGroup ;
  submitted = false;
  // tslint:disable-next-line:ban-types
  dropdownList: any;
  selectedItems = [];
  dropdownSettings = {};
  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private competenceService: CompetencesService,
              private grpCompetenceService: GrpComprtenceService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
    (params: Params) => {
      const id = params.id;
      this.idEdit = +id;
      console.log(this.idEdit);
      this.grpCompetenceService.getGrpCompetencesById(this.idEdit).subscribe(
        data => {
          console.log(data);
          this.selectedItems = data.competences ;
          this.libelle = data.libelle;
          this.description = data.description;
        }, error => {
          console.log(error);
        }
      );
    }
  );
    this.competenceService.getCompetences().subscribe(
      data => {
        console.log(data);
        this.dropdownList = data;
      }, error => {
        console.log(error);
      }
    );
    this.myForm = this.formBuilder.group({
      competence: ['', [ Validators.required]],
      libelle: ['', [ Validators.required]],
      description: ['', [ Validators.required]],
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nomCompetence',
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
  onSubmit() {
    this.submitted = true;
    const formValue = this.myForm.value;
    console.log(formValue);
    const myGrpCompetence = {
      libelle: formValue.libelle,
      competences: formValue.competence,
      description : formValue.description,
    };
    console.log(myGrpCompetence);
    this.grpCompetenceService.editGrpCompetence(myGrpCompetence, this.idEdit).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2500
        });
        setTimeout(() => {this.router.navigate(['/home', 'list-grp-competences', this.idEdit]); }, 3000);
        console.log('good');
      }, error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  onItemSelect($event: ListItem) {}

  // tslint:disable-next-line:typedef
  onSelectAll($event: Array<ListItem>) {}
}

