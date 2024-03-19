import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../../../../../service/httpRequest.service";
import {ActivatedRoute} from "@angular/router";
import {SafeUrl} from "@angular/platform-browser";
import {CarDisplay} from "../../../../../Entity/CarDisplay";

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
  constructor(private http:HttpRequestService, private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    let car = this.route.snapshot.paramMap.get('car');
    if(car == null)
      car = '';
    this.car = car;
    this.http.getSingleCar(car).subscribe({
      next:(response:CarDisplay)=>{
        this.frontImgUrl = response.imgFrontUrl;
        this.backImgUrl = response.imgBackUrl;
      },error:(err)=>{
        console.log(err.message);
      }
    })
  }



}
