import {Component, OnInit} from '@angular/core';
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
  constructor(private http: HttpRequestService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.http.getAllTracks().subscribe(
      response => {
        this.tracks = response;
      }
    )
  }
    /*this.http.getSingleTrack('Monza').subscribe({
   next: (response:TrackDisplay) => {
     this.title = response.name;
       this.country = response.country;
       this.imgUrlFront  =response.imgFrontUrl;
       this.imgUrlBack = response.imgBackUrl;

   },
   error: (err) => {
     console.log(err.message);
   }
 });
  }*/




}
