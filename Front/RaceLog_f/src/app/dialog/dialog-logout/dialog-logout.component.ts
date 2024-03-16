import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrl: './dialog-logout.component.css'
})
export class DialogLogoutComponent {
  @Input('exit')showAlert=false;
  constructor(private router:Router) {
    this.load();
  }

    private load(){
    this.showAlert = false;
    }
  confirmLogOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  abortLogout() {
    this.showAlert = false;
    this.router.navigate([])
    this.load();
  }
}
