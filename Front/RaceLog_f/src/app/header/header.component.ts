import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../service/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLogged = false;
  isAdmin = false;
  @Input()darkNavBar = false;
  @Output()loggedOut = new EventEmitter<boolean>();
  authService = inject(AuthService);

  constructor(private router:Router){}



  ngOnInit(): void {
   this.isLogged = this.authService.isLoggedIn() === 'true';
   this.isAdmin = this.authService.isAdmin();

  }
  logOut() {
    this.loggedOut.emit(true);
  }
}
