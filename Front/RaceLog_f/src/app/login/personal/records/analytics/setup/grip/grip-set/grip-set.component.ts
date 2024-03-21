import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-grip-set',
  templateUrl: './grip-set.component.html',
  styleUrl: './grip-set.component.css'
})
export class GripSetComponent {
  @Input()title = '';
  @Input()rigidezza  = 0;
  @Input()rigidezzaBump  = 0;
  @Input()distanzaBump  = 0;

  setRigidezza(val:number){
    return val.toString()
  }
  setRigidezzaBump(val:number){
    return val.toString()
  }
  setDistanzaBump(val:number){
    return val.toString()
  }

}
