import {Component, Input} from '@angular/core';
import {SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input()srcImageBack:SafeUrl = '';
  @Input()srcImageFront: SafeUrl = '';
  @Input()title: string = '';
  @Input()subtitle: string = '';
  @Input()tLength?: number;
  @Input()cornerL?:number;
  @Input()cornerR?:number;
  cardHeight: number = 0;
  @Input()type:"track"|"car" = "track";



}
