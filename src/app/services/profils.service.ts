import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfilsService {

  baseUrl = environment.api_url ;
  // tslint:disable-next-line:variable-name
  private _refresNeeded$ = new Subject<void>() ;

  get refresNeeded$(): any {
    return this._refresNeeded$ ;
  }
  constructor(private httpClient: HttpClient) {}

  // tslint:disable-next-line:typedef
  getProfil() {
    return this.httpClient.get( `${ this.baseUrl }/admin/profils?status=1`) ;
  }

  // tslint:disable-next-line:typedef
  addProfil(libelle: string) {
    // @ts-ignore
    return this.httpClient.post( `${ this.baseUrl }/admin/profils`, {libelle}).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    );
  }
  getProfilById(id: number): Observable<any> {
    return this.httpClient.get( `${ this.baseUrl }/admin/profils/` + id) ;
  }
  // tslint:disable-next-line:typedef
  editProfil(libelle: string, id: number) {
    // @ts-ignore
    return this.httpClient.put( `${ this.baseUrl }/admin/profils/` + id, {libelle}) ;
  }
  // tslint:disable-next-line:typedef
  deleteProfil(id: number) {
    return this.httpClient.delete( `${ this.baseUrl }/admin/profils/` + id).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    );
  }
}
