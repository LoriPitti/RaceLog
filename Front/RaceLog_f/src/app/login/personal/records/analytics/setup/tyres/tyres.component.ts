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
    this.tyrePressure = this.setupService.getSetup().basicSetup.tyres.tyrePressure;
    this.convertPsi();
    this.tyreCamber = this.setupService.getSetup().basicSetup.alignment.camber;
    this.convertCamber();
    this.tyreToe = this.setupService.getSetup().basicSetup.alignment.toe;
    this.convertToe();
    this.tyreCasterL = this.setupService.getSetup().basicSetup.alignment.casterLF;
    this.tyreCasterR = this.setupService.getSetup().basicSetup.alignment.casterRF;
  }

  private convertPsi(){
    this.tyrePressure = this.tyrePressure.map(val=> parseFloat(this.convert(val, 35.0, 147, 0.1).toFixed(1)));
  }
  private convertToe(){
    this.tyreToe = this.tyreToe.map(val=> parseFloat(this.convert(val, 0.4, 80, 0.01).toFixed(2)));
  }

  private convertCamber(){
    this.tyreCamber = this.tyreCamber.map(val=> {
      if(val >=7)
        return this.convert(val, 12.4, 30, 0.2)
      else
        return this.convert(val, 7.7, 6, 0.2);
    return 0});

  }
  private convert(val:number, max:number, max2: number, step:number){
    return max - (step * (max2 - val));
  }


}
