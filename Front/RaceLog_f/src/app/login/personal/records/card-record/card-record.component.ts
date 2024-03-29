import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IconsComponent} from "../../../../icons/icons.component";
import {IconSetService} from "@coreui/icons-angular";
import {
  cilArrowThickFromBottom,
  cilArrowThickFromTop,
  cilCheck,
  cilGraph,
  cilPlaylistAdd,
  cilPlus,
  cilX
} from "@coreui/icons";
import {HttpRequestService} from "../../../../service/httpRequest.service";
import {DryWet_record} from "../../../../Entity/DryWet_record";
import {ActivatedRoute, Router} from "@angular/router";
import {relative} from "@angular/compiler-cli";

@Component({
  selector: 'app-card-record',
  templateUrl: './card-record.component.html',
  styleUrl: './card-record.component.css'
})
export class CardRecordComponent implements OnInit{
  @Input()trackName: string ='';
  @Input('dry') dryRecords:DryWet_record[] = [];
  @Input('wet') wetRecords:DryWet_record[] = [];
  dryCars:string[] = [];
  wetCars:string[]=[];
  @Input('id')svg_id: string = '';
  toggle:boolean = false;
  rotateState = 0; //to track the icon rotation


  constructor(   public iconSet : IconSetService, private  http:HttpRequestService, private router:Router, private route:ActivatedRoute) {
    iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus, cilCheck, cilX, cilGraph}
  }

  ngOnInit(): void {
      this.extractCars()
  }

  rotateIcon(){
    const icon = document.getElementById(this.svg_id);
    this.toggle = !this.toggle
    if(icon)
      if(this.toggle) {
        icon.style.transform = "rotate(-180deg)";
      }else {
        icon.style.transform = "rotate(0deg)";
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


  protected readonly parseInt = parseInt;


  //OPENA ANALYTIC COMPONENT
  goToAnalytics() {
    console.log(this.route.url)
    console.log('is-logged'+ localStorage.getItem('isLogged'))
    localStorage.setItem("spectator","false");
    this.router.navigate(['records/analytics/'+this.trackName]);
  }


}
