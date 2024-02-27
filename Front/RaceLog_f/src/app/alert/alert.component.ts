import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input()message:string='';
  @Input('alertType')type:string ='danger';
  hide:boolean = false;
  @Output()hideAlert = new EventEmitter<boolean>();

  onChangeHide() {
    this.hide = true;
    this.hideAlert.emit(this.hide);
  }
}
