import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService{
  login(){
    localStorage.setItem('isLogged', 'true');
  }
  logout(){
    localStorage.clear()
  }

  isAdmin(){
    let type =  localStorage.getItem('userType');
    console.log("user type "+type)
    return type === '1';
  }

  isLoggedIn(){
    return localStorage.getItem('isLogged');
  }

}
