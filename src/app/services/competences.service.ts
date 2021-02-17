import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {

  baseUrl = environment.api_url ;

  // tslint:disable-next-line:variable-name
  private _refresNeeded$ = new Subject<void>() ;

  get refresNeeded$(): any {
    return this._refresNeeded$ ;
  }
  constructor(private httpClient: HttpClient) {}

  addCompetence(competences: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/admin/competences`, competences);
  }
  getCompetences(): Observable<any> {
    return this.httpClient.get( `${ this.baseUrl }/admin/competences?status=1`) ;
  }
  deleteCompetence(id: number): Observable<any> {
    return this.httpClient.delete( `${ this.baseUrl }/admin/competences/` + id).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    );
  }
  editCompetence(competences: any, id: number): Observable<any> {
    return this.httpClient.put(`${ this.baseUrl }/admin/competences/` + id, competences) ;
  }
  getCompetencesById(id: number): Observable<any> {
    return this.httpClient.get( `${ this.baseUrl }/admin/competences/` + id) ;
  }
}
