import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-aerodynamic-set',
  templateUrl: './aerodynamic-set.component.html',
  styleUrl: './aerodynamic-set.component.css'
})
export class AerodynamicSetComponent implements OnInit{
  @Input()condotto: number = 0;
  condottoVal = 0;
  @Input()altezza: number = 0;
  altezzaVal = 0
  @Input() spoilerSplitter:'spoiler'|'splitter' = 'splitter';
  @Input() setting : number = 0;
  settingVal = 0;
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

  convert(val:number, min:number, max:number){
    return (val - min) / (max - min) * 100;
  }

  ngOnInit(): void {
    this.condottoVal = this.convert(this.condotto, 0, 6);
    this.settingVal = this.convert(this.setting, 0, 12);
    this.altezzaVal = this.convert(this.altezza, 0, 90);

  }


}
