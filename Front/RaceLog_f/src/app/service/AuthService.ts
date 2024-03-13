import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService{
  login(){
    localStorage.setItem('isLogged', 'true');
  }
  logout(){
    localStorage.clear()
  }

  isLoggedIn(){
    return localStorage.getItem('isLogged');
  }

}
