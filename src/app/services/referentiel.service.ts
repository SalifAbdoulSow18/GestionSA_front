import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  baseUrl = environment.api_url ;
  // tslint:disable-next-line:variable-name
  private _refresNeeded$ = new Subject<void>() ;

  get refresNeeded$(): any {
    return this._refresNeeded$ ;
  }
  constructor(private httpClient: HttpClient) {}

  // tslint:disable-next-line:typedef
  getReferentiels(): Observable<any> {
    return this.httpClient.get( `${ this.baseUrl }/admin/referentiels?status=1`) ;
  }
  addReferentiel(referentiel: any): Observable<any> {
    return this.httpClient.post(`${ this.baseUrl }/admin/referentiels`, referentiel) ;
  }

  getReferentielById(id: number): Observable<any> {
    return this.httpClient.get( `${ this.baseUrl }/admin/referentiels/` + id) ;
  }
  editReferentiel(referentiel: any, id: number): Observable<any> {
    return this.httpClient.put(`${ this.baseUrl }/admin/referentiels/` + id, referentiel) ;
  }
  deleteReferentiel(id: number): Observable<any> {
    return this.httpClient.delete( `${ this.baseUrl }/admin/referentiels/` + id).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    );
  }
}
