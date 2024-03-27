import {AfterViewInit, Component, input, Input, OnInit} from '@angular/core';
import _default from "chart.js/dist/plugins/plugin.tooltip";
import afterInit = _default.afterInit;
import {ActivatedRoute, Router} from "@angular/router";
import {HttpRequestService} from "../../../../service/httpRequest.service";

@Component({
  selector: 'app-global-card',
  templateUrl: './global-card.component.html',
  styleUrl: './global-card.component.css'
})
export class GlobalCardComponent implements OnInit{

  constructor(private router:Router, private route:ActivatedRoute, private http:HttpRequestService) {
  }

  @Input()username = '';
  @Input()name = '';
  @Input()lastname = '';
  @Input()logo_src = '';
  wetTracks:string[] = [];
  dryTracks:string[] = [];
  type: 'dry'|'wet' = 'dry';
  showTracks = false;
  totTracks  = 0;

  ngOnInit() {
      this.getDryTracks();
  }

  private getDryTracks(){
    this.http.getTracksForUser(this.username, "dry").subscribe({
      next:(response=> {
        this.dryTracks = response;
        this.getWetTracks();
      }),
      error:(err)=>{console.log(err.message)}
    })
  }
  private getWetTracks(){
    this.http.getTracksForUser(this.username, "wet").subscribe({
      next:(response=> {this.wetTracks = response;this.setTotTracks()}),
      error:(err)=>{console.log(err.message)}
    })
  }
  setTotTracks(){
    this.totTracks = this.dryTracks.length + this.wetTracks.length;
  }
  gotToAnalytics($event:String) {
    localStorage.setItem("spectator", "true");
    this.router.navigate(['global/'+this.username+'/analytics/'+$event]);
  }
  displayTracks(){
    this.showTracks = !this.showTracks
  }


}
