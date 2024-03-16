import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  fileSelected?:File;
  exit = false;


  logOut($event: boolean) {
    if($event)
      this.exit = true;
  }
}
