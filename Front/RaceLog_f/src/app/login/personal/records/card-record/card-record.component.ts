import {Component, Input, OnInit} from '@angular/core';
import {IconsComponent} from "../../../../icons/icons.component";
import {IconSetService} from "@coreui/icons-angular";
import {cilArrowThickFromBottom, cilArrowThickFromTop, cilPlaylistAdd, cilPlus} from "@coreui/icons";
import {HttpRequestService} from "../../../../service/httpRequest.service";
import {DryWet_record} from "../../../../Entity/DryWet_record";

@Component({
  selector: 'app-card-record',
  templateUrl: './card-record.component.html',
  styleUrl: './card-record.component.css'
})
export class CardRecordComponent implements OnInit{
  toggle = false;
  @Input()trackName: string ='';
  @Input('dry') dryRecords:DryWet_record[] = [];
  @Input('wet') wetRecords:DryWet_record[] = [];
  dryCars:string[] = [];
  wetCars:string[]=[];
  @Input('id')svg_id: string = '';


  constructor(   public iconSet : IconSetService, private  http:HttpRequestService) {
    iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus}
  }

  ngOnInit(): void {
      this.extractCars()
  }

  toggleRecords() {
    this.toggle = !this.toggle;
    const icon = document.getElementById(this.svg_id);
   if(this.toggle){
     if(icon){
       icon.style.transform = "rotate(-180deg)";
     }
   }else{
     if(icon){
       icon.style.transform = "rotate(0deg)";
     }
   }
  }

  private extractCars(){
    let cars:Set<string> = new Set(); //set to prevent duplciate value
    this.dryRecords.forEach(element=>{
      if(element.getTrack() === this.trackName)
        cars.add(element.getCar());
    })
    this.dryCars = Array.from(cars); //<- set dry cars
    cars.clear();
    this.wetRecords.forEach(element=>{
      if(element.getTrack() === this.trackName)
        cars.add(element.getCar());
    })
    this.wetCars = Array.from(cars);
  }


}
