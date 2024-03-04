import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TrackComponent} from "../../track/track.component";
import {HttpRequestService} from "../../service/httpRequest.service";

@Component({
  selector: 'app-card-index',
  templateUrl: './card-index.component.html',
  styleUrl: './card-index.component.css'
})
export class CardIndexComponent implements OnInit{
  elements:string[] = [];
  @Input()type:'t'|'c' = 't';
  element:string = '';
  @Output()elId = new EventEmitter<string>();

  constructor(private http:HttpRequestService) {
  }
  ngOnInit(): void {
    if(this.type ==='t'){
      this.http.getAllTracksName().subscribe(response=>{
        this.elements = response;
        console.log(response)
      });
    }
    else{
      this.http.getAllCarsName().subscribe(response=>{
        this.elements = response;
        console.log(response)
      });
    }
  }

  gotTo() {
    this.elId.emit(this.element);
  }
}
