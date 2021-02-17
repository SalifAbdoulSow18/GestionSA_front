import {Component, Input, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {GrpComprtenceService} from '../../../../services/grp-comprtence.service';

@Component({
  selector: 'app-item-grp-competence',
  templateUrl: './item-grp-competence.component.html',
  styleUrls: ['./item-grp-competence.component.css']
})
export class ItemGrpCompetenceComponent implements OnInit {
  // @ts-ignore
  @Input() groupeCompetence: any;

  constructor(private grpCompetenceService: GrpComprtenceService) {}

  ngOnInit(): void {}

  // tslint:disable-next-line:typedef
  removeGrpCompetence(id: number){
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
        this.grpCompetenceService.deleteGrpCompetences(id).subscribe(reponse => {
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
