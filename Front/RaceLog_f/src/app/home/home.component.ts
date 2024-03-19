import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../service/httpRequest.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  fileSelected?:File;
  exit = false;

  constructor(private http: HttpRequestService) {
  }

  logOut($event: boolean) {
    if($event)
      this.exit = true;
  }

  ngOnInit(): void {
    this.http.getSimData().subscribe({
      next:(r)=>{
        console.log(r)
      }
    })

  }
}
