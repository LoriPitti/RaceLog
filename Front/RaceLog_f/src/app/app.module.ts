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
import { AnalyticsComponent } from './login/personal/records/analytics/analytics.component';
import { NgOptimizedImage} from "@angular/common";
import {NgApexchartsModule} from "ng-apexcharts";
import { DialogLogoutComponent } from './dialog/dialog-logout/dialog-logout.component';
import {OverflowService} from "./service/overflow.service";
import { SetupComponent } from './login/personal/records/analytics/setup/setup.component';
import { TyresComponent } from './login/personal/records/analytics/setup/tyres/tyres.component';
import {MatSlider, MatSliderThumb} from "@angular/material/slider";

import {TyresSetComponent} from "./login/personal/records/analytics/setup/tyres/tyres-set/tyres-set.component";
import {SetupService} from "./service/SetupService";
import { SuspensionComponent } from './login/personal/records/analytics/setup/suspension/suspension.component';
import { SuspensionSetComponent } from './login/personal/records/analytics/setup/suspension/suspension-set/suspension-set.component';
import { AerodynamicsComponent } from './login/personal/records/analytics/setup/aerodynamics/aerodynamics.component';
import { AerodynamicSetComponent } from './login/personal/records/analytics/setup/aerodynamics/aerodynamic-set/aerodynamic-set.component';
import { GripComponent } from './login/personal/records/analytics/setup/grip/grip.component';
import { GripSetComponent } from './login/personal/records/analytics/setup/grip/grip-set/grip-set.component';
import { GripSet2Component } from './login/personal/records/analytics/setup/grip/grip-set-2/grip-set-2.component';
import {TestService} from "./service/Test.service";
import {MatProgressBar} from "@angular/material/progress-bar";




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
    AnalyticsComponent,
    DialogLogoutComponent,
    SetupComponent,
    TyresComponent,
    TyresSetComponent,
    SuspensionComponent,
    SuspensionSetComponent,
    AerodynamicsComponent,
    AerodynamicSetComponent,
    GripComponent,
    GripSetComponent,
    GripSet2Component,
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
        NgOptimizedImage,
        NgApexchartsModule,
        MatSlider,
        MatSliderThumb,
        MatProgressBar,
    ],
  providers: [
    IconSetService,
    provideAnimationsAsync(),
    SetupService,
    TestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
