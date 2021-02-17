import { Component, OnInit } from '@angular/core';
import {GrpComprtenceService} from '../../../services/grp-comprtence.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-grp-competence',
  templateUrl: './detail-grp-competence.component.html',
  styleUrls: ['./detail-grp-competence.component.css']
})
export class DetailGrpCompetenceComponent implements OnInit {

  grpCompetences: any;

  constructor(private grpCompetenceService: GrpComprtenceService, private route: ActivatedRoute) {
    const idp = this.route.snapshot.params.id;
    this.grpCompetenceService.getGrpCompetencesById(idp).subscribe(data => {
      this.grpCompetences = data ;
      console.log(this.grpCompetences);
    }) ;
  }

  ngOnInit(): void {
  }

}
