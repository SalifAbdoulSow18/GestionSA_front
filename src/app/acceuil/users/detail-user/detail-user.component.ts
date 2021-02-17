import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  myQrCode: any ;

  users: any;

  constructor(private userService: UsersService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const idp = this.route.snapshot.params.id;
    this.userService.getUserById(idp).subscribe(data => {
      this.users = data ;
      console.log(this.users);
      this.myQrCode = `
      FirstName: ${this.users.prenom}
      LastName: ${this.users.nom}
      Email: ${this.users.email}
      PhoneNumber: ${this.users.phone}
      Profil: ${this.users.profil.libelle}
      `;
  });
  }

  transformPhoto(image: string): any {
    if (image === null) {
      return '../../../assets/images/SALogo.png' ;
    }else {
      return 'data:image/jpg;base64,' + image ;
    }
  }
}
