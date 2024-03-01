import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpRequestService} from "../service/httpRequest.service";
import {User} from "../Entity/User";
import {Track} from "../Entity/Track";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser'
import {TrackDisplay} from "../Entity/TrackDisplay";


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent implements OnInit{

  imgUrlFront:SafeUrl = '';
  imgUrlBack:SafeUrl = '';
  title:string = '';
  country: string = '';
  tracks:TrackDisplay[] = [];
  elId:string = 'card-list';
  scrollPosition:number= 0;
  constructor(private http: HttpRequestService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    //get all tracks
    this.http.getAllTracks().subscribe(
      response => {
        this.tracks = response;
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

  protected readonly document = document;
}
