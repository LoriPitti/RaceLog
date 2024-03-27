import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../service/httpRequest.service";
import {User} from "../Entity/User";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/AuthService";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {UserService} from "../service/UserService";
import {OverflowService} from "../service/overflow.service";
import {
  cilArrowThickFromBottom,
  cilArrowThickFromTop,
  cilCheck,
  cilLowVision,
  cilPlaylistAdd,
  cilPlus,
  cilX
} from "@coreui/icons";
import {IconSetService} from "@coreui/icons-angular";

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
  psw_type = 'password';
  constructor(private http:HttpRequestService, private  userService:UserService, private router:Router, private route:ActivatedRoute,
              private authService:AuthService, private iconSet: IconSetService) {
    iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus, cilCheck, cilX, cilLowVision}
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
    this.http.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('username', response.getUsername);
        localStorage.setItem('iconType', response.getIconType.toString());
        localStorage.setItem('userType', response.getUserType.toString());
        this.userService.setUserData({username: response.getUsername, password:response.getPassword,
                                      email:response.getEmail, name:response.getName, lastname:response.getLastname, iconType:response.getIconType })
        this.authService.login();
        this.router.navigate(['login/',this.username,'profile']);
      },error: (err)=> {
        this.displayAlert(err.message, 'danger');
      }
    })



  }


  onHideChange($event: boolean) {
    this.showAlert=false;
  }

  private displayAlert(msg:string, type:'danger'|'success'){
    this.showAlert=true;
    this.alertType=type;
    this.message=msg;
  }


  hideShowPasswords() {
    const icon = document.getElementById("hideShow");
      if(this.psw_type === 'password'){
        if(icon)
          icon.style.color="yellow";
        this.psw_type = 'text';
      }
      else{
        this.psw_type = 'password'
        if(icon)
          icon.style.color="grey";
      }

  }
}
