import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css'
})
export class BadgeComponent implements  OnInit{
  iconSrc:string = '/assets/icon/1.png';
  username:string = 'Username';

  ngOnInit(): void {
    //TODO READ COOKIE
  }

}
