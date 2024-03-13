import {Component, inject, Input, OnInit} from '@angular/core';
import {User} from "../../../Entity/User";
import {HttpRequestService} from "../../../service/httpRequest.service";
import {UserService} from "../../../service/UserService";

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css'
})
export class BadgeComponent implements  OnInit{
  username:string = '';
  iconSrc = '/assets/icon/';
  constructor(private http: HttpRequestService, private userService:UserService) {
  }
  ngOnInit(): void {
    const user= localStorage.getItem('username');
    const src = localStorage.getItem('iconType');
    if(user != null)
      this.username = user;
    if(src!=null)
      this.iconSrc += src + '.png';

  }

}
