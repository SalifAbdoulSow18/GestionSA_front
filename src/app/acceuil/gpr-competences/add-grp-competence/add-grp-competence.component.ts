import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListItem} from 'ng-multiselect-dropdown/multiselect.model';
import {CompetencesService} from '../../../services/competences.service';
import {GrpComprtenceService} from '../../../services/grp-comprtence.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-grp-competence',
  templateUrl: './add-grp-competence.component.html',
  styleUrls: ['./add-grp-competence.component.css']
})
export class AddGrpCompetenceComponent implements OnInit {

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
              private competenceService: CompetencesService,
              private GrpCompetenceService: GrpComprtenceService,
              private router: Router) { }

  ngOnInit(): void {
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
    const formValue = this.myForm.value ;
    // console.log(formValue);
    const myGrpCompetence = {
      libelle: formValue.libelle,
      competence: formValue.competence,
      description : formValue.description,
    };
    // console.log(myGrpCompetence);
    this.GrpCompetenceService.addGrpCompetence(myGrpCompetence).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2500
        });
        setTimeout(() => {this.router.navigate(['/home', 'list-grp-competences']); }, 3000);
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
