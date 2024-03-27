import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../../../../../service/httpRequest.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {SafeUrl} from "@angular/platform-browser";
import {CarDisplay} from "../../../../../Entity/CarDisplay";
import {Setup} from "../../../../../Entity/Setup";
import {IconSetService} from "@coreui/icons-angular";
import {
  cilActionUndo,
  cilArrowThickFromBottom,
  cilArrowThickFromTop,
  cilCheck,
  cilPlaylistAdd,
  cilPlus,
  cilX
} from "@coreui/icons";
import {SetupService} from "../../../../../service/SetupService";
import {TestService} from "../../../../../service/Test.service";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css',
})
export class SetupComponent implements OnInit{
  frontImgUrl:SafeUrl = '';
  backImgUrl:SafeUrl = '';
  brand = '';
  car = '';
  track = '';
  user = '';
  setup?:Setup;
  type:0|1 = 0;
  isTyreActive =false;
  isSuspensionActive =false;
  isAeroActive = false;
  isGripActive = false;
  modify = false;
  isSaveDisabled =true;
  showAlert = false;
  bestLap:string = '0.0.00';
  message = '';
  alertType:'success'|'danger' = 'success'



  constructor(private http:HttpRequestService, private route:ActivatedRoute, private router:Router, private iconSet:IconSetService,
  private  setupService:SetupService, private test:TestService) {
    iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus, cilCheck, cilX, cilActionUndo}
    console.log('SetupComponent initialized');
  }
  ngOnInit(): void {
    this.test.setVal(3784657837485)
    const div_router = document.getElementById("router");
    if(div_router)
      div_router.style.visibility="hidden";
    let car = this.route.snapshot.paramMap.get('car');
    if(car == null)
      car = '';
    this.car = car;
    let track = this.route.snapshot.paramMap.get('track');
    if(track == null)
      track = '';
    this.track = track;
    let user = localStorage.getItem('username');
    if(user == null)
      user = '';
    this.user = user;
    this.track = track;
    this.http.getSingleCar(car).subscribe({
      next:(response:CarDisplay)=>{
        this.frontImgUrl = response.imgFrontUrl;
        this.backImgUrl = response.imgBackUrl;
        //this.getSetup(); //-< load setup
      },error:(err)=>{
        console.log(err.message);
      }
    })
  }



  //-------------------------------------SETUP PAGES------------------------
  setupPage(page:string){
    if(page === 'tyres'){
      this.isSuspensionActive = false;
      this.isAeroActive = false;
      this.isTyreActive = true;
      this.isGripActive = false;
      this.router.navigate(['records/analytics/'+this.track+'/setup/'+this.car+'/tyres'] );
    }else if(page ==='suspensions'){
      this.isSuspensionActive = true;
      this.isTyreActive = false;
      this.isGripActive = false;
      this.isAeroActive = false;
      this.router.navigate(['records/analytics/'+this.track+'/setup/'+this.car+'/suspension']);
    }else if(page === 'aero'){
      this.isSuspensionActive = false;
      this.isTyreActive = false;
      this.isAeroActive = true;
      this.isGripActive = false;
      this.router.navigate(['records/analytics/'+this.track+'/setup/'+this.car+'/aerodynamic']);
    }else if(page === 'grip'){
      this.isSuspensionActive = false;
      this.isTyreActive = false;
      this.isAeroActive = false;
      this.isGripActive = true;
      this.router.navigate(['records/analytics/'+this.track+'/setup/'+this.car+'/grip']);
    }


  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      if (this.isFileJson(file)) {
        this.readFile(file);
        this.isSaveDisabled = false;
        const div_router = document.getElementById("router");
        if (div_router)
          div_router.style.visibility = "visible";
      } else {
        this.isSaveDisabled = true;
        alert("Il file deve essere di tipo .json");
      }
    }
  }

  isFileJson(file: File): boolean {
    return file.name.toLowerCase().endsWith('.json');
  }
  readFile(file: File) {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const setup:Setup = JSON.parse(e.target.result);
      console.log(setup)
      this.setupService.setSetup(setup)
      console.log("kjfnk"+this.setupService.getSetup().basicSetup.tyres.tyrePressure[2])
    };
    reader.readAsText(file);
  }
  backToRecords(){
    this.router.navigate(['records/analytics/'+this.track]);
  }


  //---------------------------------------BTN METHODS-------------------------


  save() {
    this.modify = false;
    this.setAlert('Attenzione, il salvataggio sovrascrive il precedente setup se esiste', 'danger');
  }
  confirmSave() {
    this.showAlert  = false;
    this.bestLap = this.setupService.getTime();
    console.log('best lap: ' + this.bestLap);
    this.http.saveSetup(this.user, this.track, this.car, this.type, this.bestLap,this.setupService.getSetup()).subscribe({
    next: (response) =>{
      this.setAlert('Setup registrato correttamente!', 'success');
    }, error:(err)=>{
        this.setAlert(err, 'danger');
        this.setAlert(err, 'danger');
      }
    })
  }

  setAlert(message:string, type:'success'|'danger'){
    this.message = message;
    this.alertType = type;
    this.showAlert  =true;
  }
}
