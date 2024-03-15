import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpRequestService} from "../../../../service/httpRequest.service";
import {ActivatedRoute, Router} from "@angular/router";

import {CarTimes} from "../../../../Entity/CarTimes";
import {TrackDisplay} from "../../../../Entity/TrackDisplay";
import {SafeUrl} from "@angular/platform-browser";
import { NgChartjsService } from 'ng-chartjs';
import { NgApexchartsModule } from 'ng-apexcharts';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import {
  cilActionUndo,
  cilArrowThickFromBottom,
  cilArrowThickFromTop,
  cilCheck,
  cilPlaylistAdd,
  cilPlus,
  cilX
} from "@coreui/icons";
import {IconSetService} from "@coreui/icons-angular";
import {CarDisplay} from "../../../../Entity/CarDisplay";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit{


  public series: any[] = [];
  public chart: any = {};


  wet = false;
  dry = true;
  track = '';
  dryCars:string[] = [];
  wetCars:string[] = [];
  car = 'Vettura';
  username='';
  carTimesDry:CarTimes[] = [];
  carTimesWet:CarTimes[] = [];
  stringTimes:string[]= [];
  numbTimes:number[] =[];
  trackImgSrc:SafeUrl = '';
  carImgSrc:SafeUrl = '';
  bestLap ='1.45.55'
  bestLapAbsolute = '';
  avgLap= '1.50.55'
  totLaps = 0;
  totAllLaps = 0;
  avgAllLaps = '1.51.33';
  brand = '';
  carBestImgSrc:SafeUrl = '';
  brandBest = '';
  carBest= '';
  showAnalytics = false;
  type = '';
  type2 = '';

  constructor(private http:HttpRequestService, private route:ActivatedRoute, public iconSet:IconSetService, private router:Router ) {
    iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus, cilCheck, cilX, cilActionUndo}

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
        this.getDryTimes();
      },error:(err) =>{
        console.log(err.message);
      }
    })
  } //--> api service call wet
  private getDryTimes(){
    this.http.getTimesForTrack(this.username, this.track, 'dry').subscribe({
      next:(response)=>{
        this.carTimesDry  = response;
        this.getWetTimes();
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
  private getWetTimes(){
    this.http.getTimesForTrack(this.username, this.track, 'wet').subscribe({
      next:(response)=>{
        this.carTimesWet  = response;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
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
    this.type ='dry';
  }
  showWet(){
    this.dry = false;
    this.wet = true;
    this.type ='wet'
  }
  //dropdown function
  setCar(car: string) {
    this.type2 =this.type;
      this.car = car;
      this.createChart();
      this.apiCar(car, 0);
      this.getBestAbsoluteLap();
      this.showAnalytics = true;
  }
  private createChart(){
    //extract only times for the car selected
    console.log(this.type)
    if(this.type === 'dry')
      this.stringTimes = this.carTimesDry.filter(obj=>obj.getCar()===this.car).map(item=>item.getTime());
    else
      this.stringTimes = this.carTimesWet.filter(obj=>obj.getCar()===this.car).map(item=>item.getTime());
    this.numbTimes= [];
    this.stringTimes.forEach(time=>{
      const parts = time.split('.');
      let minutes = parseInt(parts[0], 10);
      let seconds = parseInt(parts[1], 10);
      let ms = '';
      if(parts[2].length == 2)  //<---3 cifre per millisecondi
        ms = parts[2] + '0';
      else
        ms = parts[2];
      let milliseconds = parseInt(ms, 10);
      //01.50.234
      //01.40.34
      minutes = minutes* 100000
      seconds= seconds * 1000;
      let tot = minutes+seconds+milliseconds;
      tot = tot/100000;
      this.numbTimes.push(tot);
    })

     this.series = [{
      name: "Tempo: ",
      data: this.numbTimes
    }];

    this.chart = {
      height: 450,
      type: "line",
      zoom: {
        enabled: false
      },
      animations: {
        enabled: true,
        easing: 'ease', // Puoi regolare l'interpolazione secondo le tue preferenze
        speed: 1000, // Velocità dell'animazione in millisecondi
        animateGradually: {
          enabled: false
        },
        dynamicAnimation: {
          enabled: true,
          speed: 10
        },
      },
    };
    this.getStatistics();
  }

  private getStatistics(){
  let min = 999999;
  let minString = '';
  let times:CarTimes[] = [];
  if(this.type === 'dry')
    times= this.carTimesDry;
  else
    times = this.carTimesWet;
  times.forEach(item=>{
    if(item.getCar() === this.car){
      let time = item.getTime();
      let minutes = parseInt(time.split('.')[0], 10);
      let seconds = parseInt(time.split('.')[1], 10);
      let milliseconds = parseInt(time.split('.')[2], 10);
      minutes = minutes* 100000
      seconds= seconds * 1000;
      let tot = minutes+seconds+milliseconds;
      //check the min
      if(tot < min) {

        min = tot;
        minString = time; //<---min time in absolute
        }
      }
    })
    this.bestLap = minString;
    this.totLaps = this.numbTimes.length;
    this.totAllLaps = times.length


  }
  private getBestAbsoluteLap(){
    //find the car with the absolute best lab
    let minAbs = 8888888;
    let minAbsString = this.bestLap;
    let times:CarTimes[]= [];
    if(this.type === 'dry')
      times = this.carTimesDry;
    else
      times = this.carTimesWet;
    times.forEach(item=>{
      let time = item.getTime();
      let minutes = parseInt(time.split('.')[0], 10);
      let seconds = parseInt(time.split('.')[1], 10);
      let milliseconds = parseInt(time.split('.')[2], 10);
      minutes = minutes* 100000
      seconds= seconds * 1000;
      let tot = minutes+seconds+milliseconds;
      //check the min
      if(tot < minAbs) {
        minAbs = tot;
        minAbsString = time; //<---min time in absolute
      }
    })
    let filteredCars= times.filter(item=>item.getTime() === minAbsString);
    //take always the first car (although cars can be more tha one)
    this.bestLapAbsolute = filteredCars[0].getTime();
    this.carBest =filteredCars[0].getCar();
    this.apiCar(this.carBest,1);

  }
  private getAvgAndLaps(){

  }

  private apiCar(name:string, type:0|1){
    //get car info
    this.http.getSingleCar(name).subscribe({
      next:(response:CarDisplay) =>{
        if(type == 0){
          this.carImgSrc = response.imgFrontUrl;
          this.brand = response.brand;
        }
        else{
          this.carBestImgSrc = response.imgFrontUrl;
          this.brandBest = response.brand;
        }

      }
    })
  }
  backToRecords(){
    this.router.navigate(['login/'+this.username+'/records'])
  }
}
