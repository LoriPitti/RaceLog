import { Component } from '@angular/core';
import {cilArrowThickFromBottom, cilArrowThickFromTop, cilPlaylistAdd, cilPlus, cilPowerStandby} from "@coreui/icons";
import {IconSetService} from "@coreui/icons-angular";
import {HttpRequestService} from "../../service/httpRequest.service";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent {
  constructor(   public iconSet : IconSetService, private  http:HttpRequestService) {
    iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus}
  }

}
