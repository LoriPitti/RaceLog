import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {cilArrowThickFromBottom, cilArrowThickFromTop, cilPlaylistAdd, cilPlus, cilPowerStandby} from "@coreui/icons";
import {IconSetService} from "@coreui/icons-angular";
import {HttpRequestService} from "../../service/httpRequest.service";
import {User} from "../../Entity/User";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../service/AuthService";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent implements OnInit{
  user= new User('-', '-', '-', '-','-', 0);
  exit= false;
  constructor(  private router:Router,  public iconSet : IconSetService, private  http:HttpRequestService, private route:ActivatedRoute, public  dialog:MatDialog,  private authService:AuthService ) {
    iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus}
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.user = new User(params['username'], params['password'], params['email'], params['name'], params['lastname'], params['iconType'])
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PersonalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  logOut($event:boolean) {
    console.log("event"+ $event)
    if($event){
      this.exit = true;
    }

  }
  confirmLogOut(){
    this.authService.logout();
    this.router.navigate(['']);
  }
}
