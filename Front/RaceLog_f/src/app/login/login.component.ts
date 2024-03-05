import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../service/httpRequest.service";
import {User} from "../Entity/User";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  username:string='';
  password:string='';

  isPswValid:string = 'is-invalid';
  isValidUsername = 'is-invalid';

  usernames:string[]= [];
  showAlert=false;
  alertType='danger';
  message:string='';
  constructor(private http:HttpRequestService, private router:Router, private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    //get all usernames
    this.http.getAllUsernames().subscribe(data=>{
      this.usernames=data;
    });
  }

  onPswChange(){
    if(!this.password.trim()){
      this.isPswValid = 'is-invalid';
    }else{
      this.isPswValid = 'is-valid';
    }
  }
  onUsernameChange(){
    if(this.usernames.filter(user => user===this.username).length === 0){
      this.isValidUsername ='is-invalid';
      this.showAlert=true;
      this.alertType='danger';
      this.message='Questo nome utete non esiste';
    }
    else if(!this.username.trim())
      this.isValidUsername = 'is-invalid';
    else
      this.isValidUsername='is-valid';
  }
  isBtnDisabled():boolean{
    return !(this.isValidUsername==='is-valid' && this.isPswValid == 'is-valid');

  }
  login(): void {
    this.http.login(this.username, this.password).subscribe(response =>{
      if(typeof response == "string"){
        this.displayAlert(response, 'danger');
      }
      else{
          this.router.navigate(['login/',this.username,'profile'])
      }
    });
  }


  onHideChange($event: boolean) {
    this.showAlert=false;
  }

  private displayAlert(msg:string, type:'danger'|'success'){
    this.showAlert=true;
    this.alertType=type;
    this.message=msg;
  }


}
