import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-aerodynamic-set',
  templateUrl: './aerodynamic-set.component.html',
  styleUrl: './aerodynamic-set.component.css'
})
export class AerodynamicSetComponent {
  @Input()condotto: number = 0;
  @Input()altezza: number = 0;
  @Input() spoilerSplitter:'spoiler'|'splitter' = 'splitter';
  @Input() setting : number = 0;
  @Input() title:string = '';

  setCondott(val:number){
    return val.toString()
  }
  setAltezza(val:number){
    return val.toString()
  }
  setSetting(val:number){
    return val.toString()
  }


}
