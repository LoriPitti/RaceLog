import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../../../service/httpRequest.service";
import {UserData} from "../../../Entity/UserData";

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrl: './global.component.css'
})
export class GlobalComponent implements OnInit{

  users:UserData[] = [];
      constructor(private http:HttpRequestService) {
      }

      ngOnInit() {
        this.http.getUsersData().subscribe({
          next:(response) =>{
            this.users = response;
            console.log(this.users)
          },error:(err)=> {
            console.log("error");
          }
        })
      }
}
