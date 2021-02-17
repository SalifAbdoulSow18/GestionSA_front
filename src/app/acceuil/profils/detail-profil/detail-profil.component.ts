import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfilsService} from '../../../services/profils.service';

@Component({
  selector: 'app-detail-profil',
  templateUrl: './detail-profil.component.html',
  styleUrls: ['./detail-profil.component.css']
})
export class DetailProfilComponent implements OnInit {
  p: number | undefined;
  profil: any ;

  constructor(private route: ActivatedRoute, private profilService: ProfilsService) { }

  ngOnInit(): void {
    const idp = this.route.snapshot.params.id;
    this.profilService.getProfilById(idp).subscribe(data => {
      this.profil = data ;
      console.log(this.profil);
    });
  }

}
