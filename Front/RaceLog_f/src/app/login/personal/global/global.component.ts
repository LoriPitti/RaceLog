import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../../../service/httpRequest.service";
import {UserData} from "../../../Entity/UserData";

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrl: './global.component.css'
})
export class GlobalComponent implements OnInit{
  username: string = '';

  users:UserData[] = [];
      constructor(private http:HttpRequestService) {
      }

      ngOnInit() {
        let user = localStorage.getItem('username');
        if(user != null)
          this.username = user;
        this.http.getUsersData().subscribe({
          next:(response) =>{
            this.users = response;
            this.users = this.users.filter(user=>user.getUsername != this.username);
          },error:(err)=> {
            console.log("error");
          }
        })
      }
}
