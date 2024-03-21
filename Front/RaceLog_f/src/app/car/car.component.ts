import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {TrackDisplay} from "../Entity/TrackDisplay";
import {HttpRequestService} from "../service/httpRequest.service";
import {CarDisplay} from "../Entity/CarDisplay";
import {TestService} from "../service/Test.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit{
  imgUrlFront:SafeUrl = '';
  imgUrlBack:SafeUrl = '';
  title:string = '';
  brand: string = '';
  cars:CarDisplay[] = [];
  elId:string = 'card-list';
  scrollPosition:number= 0;
  exit = false;
  constructor(private http: HttpRequestService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    //get all tracks
    this.http.getAllCars().subscribe(
      response => {
        this.cars = response;
      }
    )
    //add scroll listener to show arrow
    window.addEventListener('scroll', this.onScroll, true);
  }
  setElId($event: string) {
    this.elId = $event;
  }

  //----------------------------------------SCROLL METHODS------------------------
  scroll() {  //scroll to a select track
    const el = document.getElementById(this.elId);
    if(el) {
      el.scrollIntoView({behavior: 'smooth'});
    }

  }//Scroll to a selected track

  private  onScroll(){
    const arrow = document.getElementById("arrow");

    this.scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if(this.scrollPosition >  window.innerHeight / 4){ //show below 1/4 height
      if(arrow)
        arrow.style.visibility='visible';
    }else{
      if(arrow)
        arrow.style.visibility='hidden';
    }
  }  //check if the page is scrolled more then half and display arrow

  scrollToTop(){
    window.scrollTo({top:0, behavior:'smooth'});
  }
  logOut($event: boolean) {
    if($event)
      this.exit = true;
  }


}
