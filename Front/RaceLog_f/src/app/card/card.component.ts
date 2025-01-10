import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {HttpRequestService} from "../service/httpRequest.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input()srcImageBack:SafeUrl = '';
  @Input()srcImageFront: SafeUrl = '';
  @Input()title: string = '';
  @Input()subtitle: string = '';
  @Input()tLength?: number;
  @Input()cornerL?:number;
  @Input()cornerR?:number;
  cardHeight: number = 0;
  @Input()type:"track"|"car" = "track";
  showAlert = false;
  showAlert2 = false;
  alertType: string = 'danger';
  message: string = '';

  constructor(private http: HttpRequestService, private router:Router){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }



  delete() {
    this.showAlert2 = true;
  }

  confirmDelete() {
    this.showAlert2   =  false;
    if(this.type ===  "track"){
      this.http.deleteTrack(this.title, true).subscribe({
        next: (response=>{
          this.displayAlert(response.toString(),'success');

        }),
        error:  (msg=>{
          this.displayAlert(msg,  'danger');
        })
      })

    }else {
      this.http.deleteCar(this.title, true).subscribe({
        next: (response=>{
          this.displayAlert(response.toString(),'success');
        }),
        error:  (msg=>{
          this.displayAlert(msg,  'danger');
        })
      })
    }

  }

  private displayAlert(msg:string, type:'danger'|'success'){
    this.showAlert=true;
    this.alertType=type;
    this.message=msg;
  }

  onHideChange($event: boolean) {
    this.showAlert=false;
    if(this.type==='track')
      this.router.navigate(['tracks']);
    else
      this.router.navigate(['cars']);
  }
}
