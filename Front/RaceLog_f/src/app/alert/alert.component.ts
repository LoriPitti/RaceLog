import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit{
  @Input()message:string='';
  @Input('alertType')type:string ='danger';
  hide:boolean = false;
  @Output()hideAlert = new EventEmitter<boolean>();

  ngOnInit() {
    console.log('message: '+this.message)
  }

  onChangeHide() {
    this.hide = true;
    this.hideAlert.emit(this.hide);
  }
}
