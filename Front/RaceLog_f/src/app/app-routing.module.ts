import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";
import {LoadTrackComponent} from "./track/load-track/load-track.component";
import {TrackComponent} from "./track/track.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path:'tracks', component: TrackComponent},
  {path: 'tracks/load/:d', component: LoadTrackComponent},
  {path:'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
