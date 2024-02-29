import {SafeUrl} from "@angular/platform-browser";

export interface TrackDisplay{
  name: string,
  country :string,
  imgBackUrl : SafeUrl,
  imgFrontUrl : SafeUrl,
  tLength : number,
  cornerL : number,
  cornerR : number
}
