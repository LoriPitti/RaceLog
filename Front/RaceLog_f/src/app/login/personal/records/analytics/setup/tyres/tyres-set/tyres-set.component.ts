import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tyres-set',
  templateUrl: './tyres-set.component.html',
  styleUrl: './tyres-set.component.css'
})
export class TyresSetComponent implements OnInit{
  @Input()psi=0;
  @Input()campanatura=0;
  @Input()convergenza=0;
  @Input()incidenza=0;
  @Input()showInc = false;
  @Input()title='';

  ngOnInit() {
    console.log("tyre: psi: "+this.psi + "camp "+this.campanatura +"conv"+this.convergenza + "inc"+this.incidenza)

  }

  setPsi(val:number){
    return val.toString()
  }
  setCamp(val:number){
    return val.toString()
  }
  setInc(val:number){
    return val.toString()
  }
  setConv(val:number){
    return val.toString()
  }
}
