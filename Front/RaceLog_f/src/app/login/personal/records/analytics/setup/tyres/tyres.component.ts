import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Setup} from "../../../../../../Entity/Setup";
import {SetupService} from "../../../../../../service/SetupService";
import {TestService} from "../../../../../../service/Test.service";

@Component({
  selector: 'app-tyres',
  templateUrl: './tyres.component.html',
  styleUrl: './tyres.component.css',
})
export class TyresComponent implements OnInit{
  setup?:Setup;
  tyrePressure:number[] = [];
  tyreCamber:number[] = [];
  tyreToe:number[] = [];
  tyreCasterL =0;
  tyreCasterR:number =0;
  constructor(private router: Router, private route: ActivatedRoute, private setupService : SetupService, private test:TestService) {
    console.log("tyre started");
  }
  ngOnInit() {
    console.log("Setup-->"+this.setupService.getSetup().basicSetup.tyres.tyrePressure[1]);
  }

}
