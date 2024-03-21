import {Component, Input} from '@angular/core';
import {OverflowService} from "../../../../../../service/overflow.service";

@Component({
  selector: 'app-suspension',
  templateUrl: './suspension.component.html',
  styleUrl: './suspension.component.css',
  providers:[OverflowService]
})
export class SuspensionComponent {
  constructor() {

  }

}
