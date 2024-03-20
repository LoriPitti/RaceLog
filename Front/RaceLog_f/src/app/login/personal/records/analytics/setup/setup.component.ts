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
import {relative} from "@angular/compiler-cli";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
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

  constructor(private http:HttpRequestService, private route:ActivatedRoute, private router:Router, private iconSet:IconSetService,
  private setupService:SetupService) {
    iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus, cilCheck, cilX, cilActionUndo}

  }
  ngOnInit(): void {
    let car = this.route.snapshot.paramMap.get('car');
    if(car == null)
      car = '';
    this.car = car;
    let track = this.route.snapshot.paramMap.get('track');
    if(track == null)
      track = '';
    let user = localStorage.getItem('username');
    if(user == null)
      user = '';
    this.user = user;
    this.track = track;
    this.http.getSingleCar(car).subscribe({
      next:(response:CarDisplay)=>{
        this.frontImgUrl = response.imgFrontUrl;
        this.backImgUrl = response.imgBackUrl;
        this.getSetup(); //-< load setup
      },error:(err)=>{
        console.log(err.message);
      }
    })
  }

  getSetup(){
    this.http.getSetup(this.user, this.track, this.car, this.type).subscribe({
      next:(response) =>{
        this.setup = response;
        if(this.setup)
          this.setupService.setSetup(this.setup);
        console.log(this.setupService.getSetup().basicSetup.tyres.tyrePressure[1])
      }, error:(err)=>{
        console.log(err.message);
      }
    })
  }

  //-------------------------------------SETUP PAGES------------------------
  setupPage(page:string){
    if(page === 'tyres'){
      this.isSuspensionActive = false;
      this.isTyreActive = true;
      this.router.navigate(['records/analytics/'+this.track+'/setup/'+this.car+'/tyres'] );
    }else if(page ==='suspensions'){
      this.isSuspensionActive = true;
      this.isTyreActive = false;
      this.router.navigate(['records/analytics/'+this.track+'/setup/'+this.car+'/suspension']);
    }

  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.readFile(file);
    }
  }

  readFile(file: File) {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const setup:Setup = e.target.result;
    };
    reader.readAsText(file);
  }
  backToRecords(){
    console.log('rf')
    this.router.navigate(['records/analytics/'+this.track]);
  }


}
