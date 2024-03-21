import {Injectable} from "@angular/core";

@Injectable({providedIn:"root"})
export class TestService{
  private val:number;
  constructor() {
    this.val = 0;
  }

  setVal(v:number){
    this.val = v;
    console.log("test serive: set riced" + this.val)
  }
  getVal(){
    console.log("test service: get riced "+this.val);return this.val}
}
