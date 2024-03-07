import {Component, Input, OnInit} from '@angular/core';
import {DryWet_record} from "../../../../../Entity/DryWet_record";

@Component({
  selector: 'app-car-card-record',
  templateUrl: './car-card-record.component.html',
  styleUrl: './car-card-record.component.css'
})
export class CarCardRecordComponent implements  OnInit{
  ngOnInit(): void {
    this.extractTime();
  }

  @Input('car')carName: string = '';
  @Input()track:string = '';
  @Input('records') recordList: DryWet_record[] = [];
  timeList:string[] = [];
  showTimes =false;

  private extractTime(){
    this.recordList.forEach(record=>{
      if(record.getCar() === this.carName && record.getTrack() ===this.track)
        this.timeList.push(record.getTime());
    })
  }

  hideShowTimes(){
    this.showTimes = !this.showTimes;
  }

}
