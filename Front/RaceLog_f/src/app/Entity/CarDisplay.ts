import {SafeUrl} from "@angular/platform-browser";

export interface CarDisplay{
  name: string,
  brand :string,
  imgBackUrl : SafeUrl,
  imgFrontUrl : SafeUrl,
  year : number,

}
