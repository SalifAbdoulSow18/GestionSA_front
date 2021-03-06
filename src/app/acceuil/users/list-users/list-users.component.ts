import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  p: number | undefined;
  search = '' ;
  users: any;

  constructor(private userService: UsersService, private router: Router) {
    this.userService.getUsers().subscribe(data => {
      this.users = data ;
      console.log(this.users);
    }) ;
  }

  ngOnInit(): void {
    // refresh table
    this.userService.refresNeeded$.subscribe(() => {
      // tslint:disable-next-line:no-unused-expression
      this.userService.getUsers().subscribe(data => {
        this.users = data ;
      }) ;
    });
    this.userService.getUsers().subscribe(data => {
      this.users = data ;
    }) ;
  }

  transformPhoto(image: string): any {
    if (image === null) {
      return '../../../assets/images/SALogo.png' ;
    }else {
      return 'data:image/jpg;base64,' + image ;
    }
  }
  removeUser(id: number): any {

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
        this.userService.deleteUser(id).subscribe(reponse => {
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
