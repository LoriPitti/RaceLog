import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../../../../service/httpRequest.service";
import {ActivatedRoute} from "@angular/router";

import {CarTimes} from "../../../../Entity/CarTimes";
import {Chart} from "angular-highcharts";
import {DatePipe} from "@angular/common";
import {TrackDisplay} from "../../../../Entity/TrackDisplay";
import {SafeUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit{

  stringTimes:string[]= [];
  wet = false;
  dry = true;
  track = '';
  dryCars:string[] = [];
  wetCars:string[] = [];
  car = 'Vettura';
  username='';
  carTimes:CarTimes[] = [];
  timesData:number[] = [];
  timesData2:Date[] = [];
  timesData3:string[] = [];
  timesChart = new Chart();
  trackImgSrc:SafeUrl = '';
  bestLap ='1.45.55'
  avgLap= '1.50.55'
  totLaps = 5
  totAllLaps = 10;
  avgAllLaps = '1.51.33';


  constructor(private http:HttpRequestService, private route:ActivatedRoute, private datePipe: DatePipe) {
  }

  //-----------------------------API CALLS---------------------------------------------
  ngOnInit(): void {
    let track = this.route.snapshot.paramMap.get('track');
    if(track == null)
      track = '';
     let username = localStorage.getItem('username');
    if(username == null)
      username = '';
    this.username = username;
    this.track = track;
    //start getting the tracks
    this.getDryCars(this.username,track);
    //get imgs
    this.getTrack();
  }
  private getDryCars(username:string, track:string){
    this.http.getCarsByTrack(username, track, 'dry').subscribe({
      next:(response:string[])=>{
        this.dryCars = response;
        this.getWetCars(username,track);
      },error:(err) =>{
        console.log(err.message);
      }
    })
  } //--> api service call dry
  private getWetCars(username:string, track:string){
    this.http.getCarsByTrack(username, track, 'wet').subscribe({
      next:(response:string[])=>{
        this.wetCars = response;
        this.getTimeForCars();
      },error:(err) =>{
        console.log(err.message);
      }
    })
  } //--> api service call wet
  private getTimeForCars(){
    this.http.getTimesForTrack(this.username, this.track, 'dry').subscribe({
      next:(response)=>{
        this.carTimes  = response;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  } //called by getWetTracks
  private getTrack(){
    this.http.getSingleTrack(this.track).subscribe({
      next: (response)=>{
        const trackDisp:TrackDisplay = response;
        this.trackImgSrc = trackDisp.imgBackUrl;
      }, error:(err) =>{
        console.log(err.message)
      }
    })
  }
  //------------------------BTN METHOD----------------------------------------
  showDry() {
    this.wet = false;
    this.dry = true;
  }
  showWet(){
    this.dry = false;
    this.wet = true;
  }
  //dropdown function
  setCar(car: string) {
      this.car = car;
    this.setCharData();
  }

  //----------------------------------CHART METHODS--------------------------------------
  private setCharData(){
    this.carTimes.forEach(el=>{
        if(el.getCar() === this.car)
          this.stringTimes.push(el.getTime()) //extract time for cars into string
      }
    )
    this.loadChartData()
  }
  private convertToMilliseconds(timeString: string): number {
    const parts = timeString.split(".");
    const minutes = parseInt(parts[0]);
    const seconds = parseInt(parts[1]);
    const tenths = parseInt(parts[2]);
    return minutes * 60000 + seconds * 1000 + tenths * 100;
  }

  private loadChartData() {

   this.timesData = this.stringTimes.map(time=> this.convertToMilliseconds(time));
    this.timesData2 = this.timesData.map(milliseconds => new Date(milliseconds));
    this.timesData3 = this.timesData2.map(date=> this.formatDate(date))
   console.log(this.timesData3)
    this.createChart();
  }
  createChart(){
    this.timesChart =  new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Times'
      },

      credits: {
        enabled: false
      },
      series: [
        {
          name: 'line1',
          data: this.timesData
        } as any
      ]
    });
  }
  // Funzione per formattare i dati temporali
  formatDate(date: Date): string {
    // Formatta la data utilizzando DatePipe con il formato desiderato
    return this.datePipe.transform(date, 'mm:ss:SSS') || '';
  }

}
