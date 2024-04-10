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
  altezza :number[] = [];

  constructor(private setupService:SetupService) {
  }
  ngOnInit() {
    this.condottiFreno = this.setupService.getSetup().advancedSetup.aeroBalance.brakeDuct;
    this.splitter = this.setupService.getSetup().advancedSetup.aeroBalance.splitter;
    this.rearWing = this.setupService.getSetup().advancedSetup.aeroBalance.rearWing;
    this.altezza[0] = this.convert(this.setupService.getSetup().advancedSetup.aeroBalance.rideHeight[0], 90, 35, 1);
    this.altezza[1] = this.convert(this.setupService.getSetup().advancedSetup.aeroBalance.rideHeight[0], 90, 35, 2);
  }

  private convert(val:number, max:number, max2: number, step:number){
    return max - (step * (max2 - val));
  }


}
