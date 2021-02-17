import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthentificationService} from './services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const  token = localStorage.getItem('token');
    if (token) {
      return true;
    }else {
      this.router.navigate(['/login']);
    }
    return true;
  }

}
