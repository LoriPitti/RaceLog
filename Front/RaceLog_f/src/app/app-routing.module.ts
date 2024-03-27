import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";
import {LoadTrackComponent} from "./track/load-track/load-track.component";
import {TrackComponent} from "./track/track.component";
import {AlertComponent} from "./alert/alert.component";
import {CardIndexComponent} from "./card/card-index/card-index.component";
import {CarComponent} from "./car/car.component";
import {LoadCarComponent} from "./car/load-car/load-car.component";
import {PersonalComponent} from "./login/personal/personal.component";
import {MyProfileComponent} from "./login/personal/my-profile/my-profile.component";
import {RecordsComponent} from "./login/personal/records/records.component";
import {GlobalComponent} from "./login/personal/global/global.component";
import {adminGuard, loginGuardGuard} from "./guard/login-guard.guard";
import {AnalyticsComponent} from "./login/personal/records/analytics/analytics.component";
import {SetupComponent} from "./login/personal/records/analytics/setup/setup.component";
import {TyresComponent} from "./login/personal/records/analytics/setup/tyres/tyres.component";
import {SuspensionComponent} from "./login/personal/records/analytics/setup/suspension/suspension.component";
import {AerodynamicsComponent} from "./login/personal/records/analytics/setup/aerodynamics/aerodynamics.component";
import {GripComponent} from "./login/personal/records/analytics/setup/grip/grip.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/:user', component:PersonalComponent, canActivateChild:[loginGuardGuard], children:[
      {path: 'profile', component: MyProfileComponent},
      {path: 'records', component: RecordsComponent},
      {path: 'global', component: GlobalComponent}
    ]},
  {path: 'global/:user/analytics/:track', component: AnalyticsComponent},
  {path: 'records/analytics/:track', component:AnalyticsComponent},
  {path: 'records/analytics/:track/setup/:car', component:SetupComponent, children:[
      {path: 'tyres', component: TyresComponent},
      {path: 'suspension', component: SuspensionComponent},
      {path: 'aerodynamic', component: AerodynamicsComponent},
      {path: 'grip', component: GripComponent}
    ]},
  {path: 'cars', component:CarComponent},
  {path:'cars/load', component:LoadCarComponent, canActivate:[adminGuard], children:[
      {path: 'insert', component : AlertComponent}
    ]},
  {path:'tracks', component: TrackComponent},
  {path: 'tracks/load', component: LoadTrackComponent,  canActivate:[adminGuard], children :[
      {path: 'insert', component : AlertComponent}
    ]},
  {path:'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
