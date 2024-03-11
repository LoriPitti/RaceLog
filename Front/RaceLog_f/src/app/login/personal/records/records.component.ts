import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
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

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit{
  @Input()username = 'LoriPitti';
  dryRecords :DryWet_record[] = [];
  wetRecords:DryWet_record[] = [];
  finalTrackList:string[] = [];
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

  constructor(   public iconSet : IconSetService, private  http:HttpRequestService, private router:Router) {
    iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus, cilCheck, cilX}

  }

  ngOnInit(): void {
    this.loadDryRecords();
  }
  //------------------HTTP SERVICE----------------------------------------------------------
  private loadDryRecords(){
    //get all dry records for user
    this.http.getUserDryRecords(this.username,'dry').subscribe( {
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
    this.http.getUserDryRecords(this.username,'wet').subscribe( {
      next:(response: DryWet_record[]) =>{
        this.wetRecords = response;  //<-- assign dry record
        this.extractTracks();
      },error: (error) =>{
        console.log(error.message);
      }
    });
  }
//-------------------------------------------------------------------------------
  private extractTracks(){
    let trackList1:string[] = [];
    //extract track from dry record
    this.dryRecords.forEach(record=>{
      trackList1.push(record.getTrack());
    })

    let trackList2:string[] = [];
    //extract track from wet record
    this.wetRecords.forEach(record=>{
      trackList2.push(record.getTrack());
    })
    this.finalTrackList =  Array.from(new Set(trackList1.concat(trackList2)));
  }

  showDiv(type:string) {
    let id:string;
    if(type === 'add'){
      this.showAddDiv = !this.showAddDiv;
      id="addIcon";
    }
    else{
      this.showDeleteDiv =!this.showDeleteDiv;
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
  }
  setCarTrack($event: string, type:'t'|'c'){
    if(type ==='t'){
      this.track = $event;
      //if is not valid track
      if(!this.track.trim()  || this.track.substring(0, 5) == 'Cerca' ) {
        this.isValidTrack = false;
        this.carSelectorDisabled=true;
      }
      else{
        this.isValidTrack = true;
        this.carSelectorDisabled = false; //enable car selector
      }
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
    if((!this.track.trim()  || this.track.substring(0, 5) == 'Cerca' ) || ( !this.car.trim() || this.car.substring(0,5) === 'Cerca' ) || this.isValidTime==='is-invalid') {
      return true;
    }
    else
      return false;
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

  closeDiv() {
    this.time = ''
    this.isValidTime = '';
    this.showAddDiv = !this.showAddDiv;
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
