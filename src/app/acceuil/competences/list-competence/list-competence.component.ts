import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../../../services/competences.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-competence',
  templateUrl: './list-competence.component.html',
  styleUrls: ['./list-competence.component.css']
})
export class ListCompetenceComponent implements OnInit {

  Competences: any;
  selectedOption: string | undefined;
  competenceChoised: any ;
  niveau1: any ;
  niveau2: any ;
  niveau3: any ;
  idEdit: any ;
  idDelete: any ;
  edit = 0;

  constructor(private CompetenceService: CompetencesService) {
    this.CompetenceService.getCompetences().subscribe(data => {
      this.Competences = data ;
      console.log(this.Competences);
    }) ;
  }

  ngOnInit(): void {
    this.CompetenceService.refresNeeded$.subscribe(() => {
      this.CompetenceService.getCompetences().subscribe(data => {
        this.Competences = data ;
        console.log(this.Competences);
      }) ;
    });
    this.CompetenceService.getCompetences().subscribe(data => {
      this.Competences = data ;
      console.log(this.Competences);
    }) ;
  }

  // tslint:disable-next-line:typedef
  optionChoised(id: any) {
    console.log(id);
    // @ts-ignore
    if (id !== 'Select a competence') {
      this.idEdit = id ;
      this.edit = 1 ;
      this.CompetenceService.getCompetencesById(id).subscribe(data => {
        this.competenceChoised = data ;
        this.niveau1 = this.competenceChoised.niveaux[0];
        console.log(this.niveau1);
        this.niveau2 = this.competenceChoised.niveaux[1];
        this.niveau3 = this.competenceChoised.niveaux[2];
      }) ;
    }
  }

  // tslint:disable-next-line:typedef
  removeCompetence(id2: any) {
    this.idDelete = id2 ;
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
        this.CompetenceService.deleteCompetence(this.idDelete).subscribe(reponse => {
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
