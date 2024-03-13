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
import { CardIndexComponent } from './card/card-index/card-index.component';
import { CarComponent } from './car/car.component';
import { LoadCarComponent } from './car/load-car/load-car.component';
import { PersonalComponent } from './login/personal/personal.component';
import { MyProfileComponent } from './login/personal/my-profile/my-profile.component';
import { RecordsComponent } from './login/personal/records/records.component';
import { GlobalComponent } from './login/personal/global/global.component';
import { BadgeComponent } from './login/personal/badge/badge.component';
import { CardRecordComponent } from './login/personal/records/card-record/card-record.component';

import {IconDirective, IconSetService} from "@coreui/icons-angular";
import { CarCardRecordComponent } from './login/personal/records/card-record/car-card-record/car-card-record.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";

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
    CardComponent,
    CardIndexComponent,
    CarComponent,
    LoadCarComponent,
    PersonalComponent,
    MyProfileComponent,
    RecordsComponent,
    GlobalComponent,
    BadgeComponent,
    CardRecordComponent,
    CarCardRecordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IconDirective,
    MatSlideToggleModule,
    MatDialogContent,
    MatDialogActions,
  ],
  providers: [
    IconSetService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
