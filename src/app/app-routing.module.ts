import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AcceuilComponent} from './acceuil/acceuil.component';
import {ListUsersComponent} from './acceuil/users/list-users/list-users.component';
import {ListProfilComponent} from './acceuil/profils/list-profil/list-profil.component';
import {ListProfilSortieComponent} from './acceuil/profilSortie/list-profil-sortie/list-profil-sortie.component';
import {AddUserComponent} from './acceuil/users/add-user/add-user.component';
import {EditUserComponent} from './acceuil/users/edit-user/edit-user.component';
import {ListPromoComponent} from './acceuil/promos/list-promo/list-promo.component';
import {AddPromoComponent} from './acceuil/promos/add-promo/add-promo.component';
import {EditPromoComponent} from './acceuil/promos/edit-promo/edit-promo.component';
import {ListReferentielComponent} from './acceuil/referentiels/list-referentiel/list-referentiel.component';
import {AddReferentielComponent} from './acceuil/referentiels/add-referentiel/add-referentiel.component';
import {EditReferentielComponent} from './acceuil/referentiels/edit-referentiel/edit-referentiel.component';
import {ListCompetenceComponent} from './acceuil/competences/list-competence/list-competence.component';
import {AddCompetenceComponent} from './acceuil/competences/add-competence/add-competence.component';
import {EditCompetenceComponent} from './acceuil/competences/edit-competence/edit-competence.component';
import {ListGrpCompetenceComponent} from './acceuil/gpr-competences/list-grp-competence/list-grp-competence.component';
import {AddGrpCompetenceComponent} from './acceuil/gpr-competences/add-grp-competence/add-grp-competence.component';
import {EditGrpCompetenceComponent} from './acceuil/gpr-competences/edit-grp-competence/edit-grp-competence.component';
import {FormateurComponent} from './formateur/formateur.component';
import {ApprenantComponent} from './apprenant/apprenant.component';
import {CmComponent} from './cm/cm.component';
import {VerificationGuard} from './verification.guard';
import {DetailUserComponent} from './acceuil/users/detail-user/detail-user.component';
import {DetailProfilComponent} from './acceuil/profils/detail-profil/detail-profil.component';
import {ListUsersArchiveComponent} from './acceuil/users/list-users-archive/list-users-archive.component';
import {DetailGrpCompetenceComponent} from './acceuil/gpr-competences/detail-grp-competence/detail-grp-competence.component';
import {TokenGuard} from './token.guard';
import {DetailReferentielComponent} from './acceuil/referentiels/detail-referentiel/detail-referentiel.component';
import {DetailPromoComponent} from './acceuil/promos/detail-promo/detail-promo.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'formateur', component: FormateurComponent, canActivate: [VerificationGuard, TokenGuard] },
  { path: 'apprenant', component: ApprenantComponent, canActivate: [VerificationGuard, TokenGuard] },
  { path: 'cm', component: CmComponent, canActivate: [VerificationGuard, TokenGuard] },
  { path: 'home', component: AcceuilComponent, canActivate: [VerificationGuard, TokenGuard], children: [
      { path: 'list-users', component: ListUsersComponent },
      { path: 'list-user-archived', component: ListUsersArchiveComponent },
      { path: 'list-users/:id', component: DetailUserComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'list-profils', component: ListProfilComponent },
      { path: 'list-profils/:id', component: DetailProfilComponent },
      { path: 'list-profilSortie', component: ListProfilSortieComponent },
      { path: 'list-promos', component: ListPromoComponent },
      { path: 'list-promos/:id', component: DetailPromoComponent },
      { path: 'add-promo', component: AddPromoComponent },
      { path: 'edit-promo/:id', component: EditPromoComponent },
      { path: 'list-referentiels', component: ListReferentielComponent },
      { path: 'list-referentiels/:id', component: DetailReferentielComponent },
      { path: 'add-referentiel', component: AddReferentielComponent },
      { path: 'edit-referentiel/:id', component: EditReferentielComponent },
      { path: 'list-competences', component: ListCompetenceComponent },
      { path: 'add-competence', component: AddCompetenceComponent },
      { path: 'edit-competence/:id', component: EditCompetenceComponent },
      { path: 'list-grp-competences', component: ListGrpCompetenceComponent },
      { path: 'list-grp-competences/:id', component: DetailGrpCompetenceComponent },
      { path: 'add-grp-competence', component: AddGrpCompetenceComponent },
      { path: 'edit-grp-competence/:id', component: EditGrpCompetenceComponent },
    ]
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
