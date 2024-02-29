import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {FormsModule} from "@angular/forms";
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { TrackComponent } from './track/track.component';
import { LoadTrackComponent } from './track/load-track/load-track.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    NotFoundComponent,
    AlertComponent,
    LoginComponent,
    TrackComponent,
    LoadTrackComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
