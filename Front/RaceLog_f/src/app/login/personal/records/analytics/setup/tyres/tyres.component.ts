import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Setup} from "../../../../../../Entity/Setup";
import {SetupService} from "../../../../../../service/SetupService";

@Component({
  selector: 'app-tyres',
  templateUrl: './tyres.component.html',
  styleUrl: './tyres.component.css'
})
export class TyresComponent implements OnInit{
  setup?:Setup;
  tyrePressure:number[] = [];
  tyreCamber:number[] = [];
  tyreToe:number[] = [];
  tyreCasterL =0;
  tyreCasterR:number =0;
  setupService = inject(SetupService)
  constructor(private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit() {
      console.log("->"+this.setupService.getSetup().basicSetup.tyres.tyrePressure[1])

  }

}
