import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilSortieService {

  baseUrl = environment.api_url ;

  // tslint:disable-next-line:variable-name
  private _refresNeeded$ = new Subject<void>() ;

  get refresNeeded$(): any {
    return this._refresNeeded$ ;
  }
  constructor(private httpClient: HttpClient) {}

  // tslint:disable-next-line:typedef
  getProfilSortie() {
    return this.httpClient.get( `${ this.baseUrl }/admin/profilsorties?status=1`) ;
  }

  // tslint:disable-next-line:typedef
  addProfilSortie(libelle: string) {
    // @ts-ignore
    return this.httpClient.post( `${ this.baseUrl }/admin/profilsorties`, {libelle}).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    );
  }
  // tslint:disable-next-line:typedef
  editProfilSortie(libelle: string, id: number) {
    // @ts-ignore
    return this.httpClient.put( `${ this.baseUrl }/admin/profilsorties/` + id, {libelle}) ;
  }
  // tslint:disable-next-line:typedef
  deleteProfilSortie(id: number) {
    return this.httpClient.delete( `${ this.baseUrl }/admin/profilsorties/` + id).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    );
  }
}
