import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-suspension-set',
  templateUrl: './suspension-set.component.html',
  styleUrl: './suspension-set.component.css'
})
export class SuspensionSetComponent {
  @Input()compressione=0
  @Input()compressioneVeloce=0
  @Input()estensione = 0
  @Input()estensioneVeloce=0
  @Input()title = '';

  setCompressione(val:number){
    return val.toString()
  }
  setCompressioneVeloce(val:number){
    return val.toString()
  }
  setEstensione(val:number){
    return val.toString()
  }
  setEstensioneVeloce(val:number){
    return val.toString()
  }

}
