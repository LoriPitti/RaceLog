import {Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class UserService{
  private userData:any;

  setUserData(userData: any): void{
    this.userData = userData;
  }
  getUserData():any{
    return this.userData;
  }
}
