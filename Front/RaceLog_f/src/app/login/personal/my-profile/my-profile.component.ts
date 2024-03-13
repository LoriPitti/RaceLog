import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/UserService";
import {HttpRequestService} from "../../../service/httpRequest.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{

  constructor(private userService:UserService, private http: HttpRequestService){
  }
  name = '';
  lastname = '';
  email= '';
  password = '';
  modify = false;

  ngOnInit() {
    let username = localStorage.getItem('username');
    if(username != null){
      this.http.getUserData(username).subscribe({
        next:(response => {
          this.name = response.getName;
          this.email = response.getEmail;
          this.lastname = response.getLastname;
          this.password = response.getPassword;
        }), error: err => {
          console.log('alert' + err.message);
        }
      })
    }

  }


}
