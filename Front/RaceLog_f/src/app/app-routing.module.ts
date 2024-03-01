import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";
import {LoadTrackComponent} from "./track/load-track/load-track.component";
import {TrackComponent} from "./track/track.component";
import {AlertComponent} from "./alert/alert.component";
import {CardIndexComponent} from "./card/card-index/card-index.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: CardIndexComponent},
  {path:'tracks', component: TrackComponent},
  {path: 'tracks/load', component: LoadTrackComponent, children :[
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
