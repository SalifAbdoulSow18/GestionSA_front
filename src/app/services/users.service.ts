import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.api_url ;

  // tslint:disable-next-line:variable-name
  private _refresNeeded$ = new Subject<void>() ;

  get refresNeeded$():any {
    return this._refresNeeded$ ;
  }
  constructor(private httpClient: HttpClient) {}

  addUser(user: any): Observable<any> {
    return this.httpClient.post(`${ this.baseUrl }/admin/users`, user) ;
  }
  getUsers(): Observable<any> {
    return this.httpClient.get( `${ this.baseUrl }/admin/users?status=1`) ;
  }
  getUsersArchive(): Observable<any> {
    return this.httpClient.get( `${ this.baseUrl }/admin/users?status=0`) ;
  }
  getApprenants(): Observable<any> {
    return this.httpClient.get( `${ this.baseUrl }/apprenants?status=1`) ;
  }

  getUserById(id: number): Observable<any> {
    return this.httpClient.get( `${ this.baseUrl }/admin/users/` + id) ;
  }
  editUser(user: any, id: number): Observable<any> {
    return this.httpClient.put(`${ this.baseUrl }/admin/users/` + id, user) ;
  }
  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete( `${ this.baseUrl }/admin/users/` + id).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    );
  }
}
