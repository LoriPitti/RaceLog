import {Component, OnInit} from '@angular/core';
import {SetupService} from "../../../../../../service/SetupService";

@Component({
  selector: 'app-aerodynamics',
  templateUrl: './aerodynamics.component.html',
  styleUrl: './aerodynamics.component.css'
})
export class AerodynamicsComponent implements OnInit{
  condottiFreno:number[] = [];
  splitter = 0;
  rearWing = 0;

  constructor(private setupService:SetupService) {
  }
  ngOnInit() {
    this.condottiFreno = this.setupService.getSetup().advancedSetup.aeroBalance.brakeDuct;
    this.splitter = this.setupService.getSetup().advancedSetup.aeroBalance.splitter;
    this.rearWing = this.setupService.getSetup().advancedSetup.aeroBalance.rearWing;

  }

}
