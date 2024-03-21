import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-grip-set-2',
  templateUrl: './grip-set-2.component.html',
  styleUrl: './grip-set-2.component.css'
})
export class GripSet2Component {
  @Input()title = '';
  @Input()barraRollio = 0;
  @Input()potenzaFreni = '0';
  @Input()bilFreni = 0;
  @Input()rappSterzo = 0;
  @Input()isFront = true;
  @Input()precarico = 0;

  setRollio(val:number){
    return val.toString()
  }
  setPotenza(val:number){
    return val.toString()
  }
  setBil(val:number){
    return val.toString()
  }
  setSterzo(val:number){
    return val.toString()
  }
  setPrecarico(val:number){
    return val.toString()
  }

}
