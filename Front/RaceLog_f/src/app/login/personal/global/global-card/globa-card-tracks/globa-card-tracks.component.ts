import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IconSetService} from "@coreui/icons-angular";
import {
  cilActionUndo,
  cilArrowThickFromBottom,
  cilArrowThickFromTop,
  cilCheck, cilGraph,
  cilPlaylistAdd,
  cilPlus,
  cilX
} from "@coreui/icons";

@Component({
  selector: 'app-globa-card-tracks',
  templateUrl: './globa-card-tracks.component.html',
  styleUrl: './globa-card-tracks.component.css'
})
export class GlobaCardTracksComponent {
 @Input()track = '';
 @Output()clicked = new EventEmitter<string>();
 constructor(private iconSet:IconSetService) {
   iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus, cilCheck, cilX, cilActionUndo, cilGraph}
 }

  navigate() {
    this.clicked.emit(this.track);
  }
}
