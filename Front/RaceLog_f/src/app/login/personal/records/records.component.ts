import {Component, EventEmitter, inject, Input, Output, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {IconSetService} from "@coreui/icons-angular";
import {HttpRequestService} from "../../../service/httpRequest.service";
import {
  cibIndeed,
  cibOsi,
  cilArrowThickFromBottom,
  cilArrowThickFromTop,
  cilCheck,
  cilPlaylistAdd,
  cilPlus,
  cilX
} from "@coreui/icons";
import {DryWet_record} from "../../../Entity/DryWet_record";
import {CardRecordComponent} from "./card-record/card-record.component";
import {Router} from "@angular/router";
import {OverflowService} from "../../../service/overflow.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit{
  username= '';
  dryRecords :DryWet_record[] = [];
  wetRecords:DryWet_record[] = [];
  finalTrackList:string[] = [];
  trackWet:string[] = [];
  trackDry:string[] = [];
  showAddDiv:boolean = false;
  showDeleteDiv = false;
  car:string = '';
  track:string = '';
  time: string = '';
  isValidTime = 'is-invalid';
  isValidTrack = false;
  type:boolean = true; //false = wet, true == dry
  typeDelete:boolean = true; //false = wet, true == dry
  showAlert = false;
  message = '';
  alertType = 'danger';
  times:string[] = [];
  carSelectorDisabled = true;
  trackDelete:string = ''; //<- track and car selected to be deleted
  carDelete:string ='';
  timeDelete = '';
  isValidDeleteTrack = false;
  isValidDeleteCar = false;
  carDeleteSelectorDisabled = true;
  timeDeleteDisabled =true;
  isValidDeleteTime = false;
   dryCars: string[] =[];
   wetCars:string[] = [];
  timeDryList:string[] = [];
  timeWetList:string[] = [];
  isBtnDeleteDisabled = true;
  ovService = inject(OverflowService)
  constructor(   public iconSet : IconSetService, private  http:HttpRequestService, private router:Router) {
    iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus, cilCheck, cilX}

  }

  ngOnInit(): void {
    localStorage.setItem('overflow', 'true');
    const user = localStorage.getItem('username');
    if(user!=null)
      this.username = user;
    this.loadDryRecords();
  }
  //------------------HTTP SERVICE----------------------------------------------------------
  private loadDryRecords(){
    //get all dry records for user
    this.http.getUserRecords(this.username,'dry').subscribe( {
      next:(response: DryWet_record[]) =>{
        this.dryRecords = response;  //<-- assign dry record
        this.loadWetRecords()
      },error: (error) =>{
        console.log(error.message);
      }
    });
  }
  private loadWetRecords(){
    //get all wet records
    this.http.getUserRecords(this.username,'wet').subscribe( {
      next:(response: DryWet_record[]) =>{
        this.wetRecords = response;  //<-- assign dry record
        this.extractTracks();
      },error: (error) =>{
        console.log(error.message);
      }
    });
  }
//-------------------------------------------METHODs TO EXTRACT TRACK, CARS  AND TIME  TO DELETE------------------------------------
  private extractTracks(){
    let trackList1:string[] = [];
    //extract track from dry record
    this.dryRecords.forEach(record=>{
      trackList1.push(record.getTrack());
    })
    this.trackDry = Array.from(new Set(trackList1)); //<- set dry tracks

    let trackList2:string[] = [];
    //extract track from wet record
    this.wetRecords.forEach(record=>{
      trackList2.push(record.getTrack());
    })
    this.trackWet = Array.from(new Set(trackList2)); //<- set wet tracks
    this.finalTrackList =  Array.from(new Set(trackList1.concat(trackList2)));
  }
  private extractCars(){
    let cars:Set<string> = new Set(); //set to prevent duplciate value
    //if DRY
    if(this.typeDelete){
      this.dryRecords.forEach(element=>{
        if(element.getTrack() === this.trackDelete)
          cars.add(element.getCar());
      })
      this.dryCars = Array.from(cars); //<- set dry cars
       cars.clear();
    }else{ //IF WET
      this.wetRecords.forEach(element=>{
        if(element.getTrack() === this.trackDelete)
          cars.add(element.getCar());
      })
      this.wetCars = Array.from(cars);
    }
  }

  setDeleteTrackCar(type:'t'|'c') {
    if (type === 't') {
      console.log(this.trackDelete)
      if (!this.trackDelete.trim() || this.trackDelete.substring(0, 5) == 'Selez') {
        this.isValidDeleteTrack = false;
        this.carDeleteSelectorDisabled = true;
        this.carDelete = '';
      } else {
        this.isValidDeleteTrack = true;
        this.carDeleteSelectorDisabled = false;
        this.extractCars();
      }
    } else { //setting the car
      if (!this.carDelete.trim() || this.carDelete.substring(0, 5) == 'Selez') {
        this.isValidDeleteTrack = false;
        this.timeDeleteDisabled = true;
        this.timeDelete = '';
      }
      else {
        this.isValidDeleteCar = true;
        this.timeDeleteDisabled=false;
        this.extractTime();
      }
    }
  }
  private extractTime(){
    if(this.typeDelete){
      this.dryRecords.forEach(record=>{
        if(record.getCar() === this.carDelete && record.getTrack() ===this.trackDelete)
          this.timeDryList.push(record.getTime());
      })
    }
    else{
      this.wetRecords.forEach(record=>{
        if(record.getCar() === this.carDelete && record.getTrack() ===this.trackDelete)
          this.timeWetList.push(record.getTime());
      })
    }
  }
  public setTime(){
    if(!this.timeDelete.trim() || this.time.substring(0, 5) == 'Selez') {
      this.isValidDeleteTime = false;
      this.isBtnDeleteDisabled = true;
    }else{
      this.isValidDeleteTime = true;
      this.isBtnDeleteDisabled = false;
    }
  }

  //-----------------ADD/DELETE--------------------------
  showDiv(type:string) {
    let id:string;
    if(type === 'add'){
     this.showAddDiv = !this.showAddDiv;
      this.showDeleteDiv = false;
      id="addIcon";
    }
    else{
      this.showDeleteDiv =!this.showDeleteDiv
      this.showAddDiv = false;
      id="deleteIcon";
    }
    const icon = document.getElementById(id);
    if(this.showAddDiv){
      if(icon)
        icon.style.transform = "rotate(90deg)"
    }
    else{
      if(icon)
        icon.style.transform = "rotate(0deg)"
    }
  } //show DELETE or ADD DIV
  closeDiv() {
    this.time = ''
    this.isValidTime = '';
    if(this.showDeleteDiv)
      this.showDeleteDiv = false;
    if(this.showAddDiv)
      this.showAddDiv = false;
  }

  setCarTrack($event: string, type:'t'|'c'){
    if(type ==='t'){
      this.track = $event;
      //if is not valid track
      this.isValidTrack = !(!this.track.trim() || this.track.substring(0, 5) == 'Cerca');
    }
    else
      this.car = $event;
  }
  onTimeChange() {
    const regex = /^[0-9]+$/;
    if(!this.time.trim()) {
      this.isValidTime = 'is-invalid';
      return;
    }
    if (regex.test(this.time.substring(0, 2))) { //minut
      if (this.time.charAt(2) === '.') {//.
        if (regex.test(this.time.substring(3, 5))) { //secondi
          if (this.time.charAt(5) === '.') {  //.
            if (regex.test(this.time.substring(6, this.time.length))){
              //decimi
              this.isValidTime ='is-valid';
              return
            }
          }
        }
      }
    }
    this.isValidTime='is-invalid';
  } //time validetion
  isBtnDisabled() {
    if((!this.isValidTrack) || ( !this.car.trim() || this.car.substring(0,5) === 'Cerca' ) || this.isValidTime==='is-invalid') {
      return true;
    }
    else
      return false;
  }
  deletRecord() {
    let type:'d'|'w';
    if(this.typeDelete)
      type = 'd';
    else
      type = 'w';
        this.http.deleteRecord(this.username, this.trackDelete, this.carDelete, this.timeDelete, type).subscribe({
          next:(response) =>{
            console.log('Message: ', response);
            this.displayAlert(response, 'success');
            this.router.navigate(['login/'+this.username+'/records']).then(() => {window.location.reload()})
          },error:(err)=>{
            this.displayAlert(err.message, 'danger');
          }
        })
  }
  //------------------------------REGISTER NEW RECORD------------------------------

  insertRecord() {
    console.log(this.username)
    let t:'d'|'w' = 'd';
    if(this.type)
      t = 'd';
    else
      t = 'w'
    this.http.insertNewRecord(this.username, this.track, this.car, this.time, t).subscribe({
      next:(response)=> {
        console.log('Message:', response);
        this.router.navigate(['login/'+this.username+'/records']).then(() => {window.location.reload()})
      },
      error: (err) => {
        this.displayAlert(err.message, 'danger');
      }
    })
  }



  onHideChange($event: boolean) {
    this.showAlert=false;
  }
  private displayAlert(msg:string, type:'danger'|'success'){
    this.showAlert=true;
    this.alertType=type;
    this.message=msg;
  }



}
