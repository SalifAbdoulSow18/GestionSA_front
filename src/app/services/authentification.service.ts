import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient, private router: Router) {
  }

  // tslint:disable-next-line:new-parens
  helpers = new JwtHelperService;
  baseUrl = environment.api_url;

  // tslint:disable-next-line:typedef
  login(email: string, password: string) {
    console.log(this.baseUrl);
    return this.http.post(this.baseUrl + '/login', {
      email, password
    })
      .pipe(
        map ((response: any ) => {
          const tokenDecode = this.helpers.decodeToken(response.token);
          console.log(tokenDecode);

          // stockage de token d'un users dans le localStorage!!!
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', tokenDecode.id);
          localStorage.setItem('email', tokenDecode.email);
          localStorage.setItem('role', tokenDecode.roles);
          localStorage.setItem('archive', tokenDecode.status);
          // la redirection à partir des roles
          // @ts-ignore
          if (localStorage.getItem('archive') === 'true') {
            if (localStorage.getItem('role') === 'ROLE_ADMIN') {
              console.log(localStorage.getItem('role'));
              this.router.navigate(['/home']);
            } else if (localStorage.getItem('role') === 'ROLE_FORMATEUR') {
              this.router.navigate(['/formateur']);
            } else if (localStorage.getItem('role') === 'ROLE_CM') {
              this.router.navigate(['/cm']);
            } else if (localStorage.getItem('role') === 'ROLE_APPRENANT') {
              this.router.navigate(['/apprenant']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'data invalid',
                text: 'Verified your data',
                confirmButtonColor: '#d33'
              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'You are not allowed!',
              text: 'Ask the administration!',
              confirmButtonColor: '#d33'
            });
          }
        })
      ) ;
  }
  // tslint:disable-next-line:typedef
    getToken(key: any) {
      const token = localStorage.getItem('token');
      if (token !== 'undifined') {
        return token;
      }else {
        return null;
      }
    }

  // tslint:disable-next-line:typedef
  logout() {
    return localStorage.removeItem('token') ;
  }
}
