import { Component, OnInit } from '@angular/core';
import {GrpComprtenceService} from '../../../services/grp-comprtence.service';

@Component({
  selector: 'app-list-grp-competence',
  templateUrl: './list-grp-competence.component.html',
  styleUrls: ['./list-grp-competence.component.css']
})
export class ListGrpCompetenceComponent implements OnInit {
  p: number | undefined;
  grpCompetences: any;

  constructor(private grpCompetenceService: GrpComprtenceService) {
    this.grpCompetenceService.getGrpCompetences().subscribe(data => {
      this.grpCompetences = data ;
      console.log(this.grpCompetences);
    }) ;
  }

  ngOnInit(): void {
    this.grpCompetenceService.refresNeeded$.subscribe(() => {
      this.grpCompetenceService.getGrpCompetences().subscribe(data => {
        this.grpCompetences = data ;
        console.log(this.grpCompetences);
      }) ;
    });
    this.grpCompetenceService.getGrpCompetences().subscribe(data => {
      this.grpCompetences = data ;
      console.log(this.grpCompetences);
    }) ;
  }

}
