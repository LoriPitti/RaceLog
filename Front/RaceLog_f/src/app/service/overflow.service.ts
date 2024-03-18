import {Inject, Injectable} from "@angular/core";

@Injectable({providedIn:"root"})
export class OverflowService{
  private ov_hidden = true;
  constructor() {
  }

   getOv_hidden(){
    return this.ov_hidden;
  }

  setOv_hidden(val:boolean){
    this.ov_hidden = val;
  }
}
