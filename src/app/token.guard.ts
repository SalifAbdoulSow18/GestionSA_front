import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthentificationService} from './services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthentificationService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    const helper = new JwtHelperService();
    // Recuperation du token stocké dans le localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // @ts-ignore
      const ExpToken = helper.isTokenExpired(token);
      if (ExpToken) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    }
    return true;
  }
}
