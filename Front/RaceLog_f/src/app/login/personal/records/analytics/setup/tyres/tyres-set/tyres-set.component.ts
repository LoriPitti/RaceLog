import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tyres-set',
  templateUrl: './tyres-set.component.html',
  styleUrl: './tyres-set.component.css'
})
export class TyresSetComponent implements OnInit{
  @Input()psi=0;
  psiBar = 0;
  @Input()campanatura=0;
  @Input()convergenza=0;
  convBar = 0;
  @Input()incidenza=0;
  @Input()showInc = false;
  @Input()title='';
  inputDisabled = true;


  ngOnInit() {
    this.psiBar = this.convert(this.psi, 20.3,  35.0);
    this.convBar = this.convert(this.convergenza, -0.4, 0.4);

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

  convert(val:number, min:number, max:number){
    return (val - min) / (max - min) * 100;
  }

}
