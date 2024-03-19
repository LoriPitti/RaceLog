import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "../../../service/UserService";
import {HttpRequestService} from "../../../service/httpRequest.service";
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
import {OverflowService} from "../../../service/overflow.service";
import {convertOutputFile} from "@angular-devkit/build-angular/src/tools/esbuild/utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{

  constructor(private userService:UserService, private http: HttpRequestService, public iconSet:IconSetService, private router:Router ){
    iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus, cilCheck, cilX, cilLowVision}
  }
  name = '';
  lastname = '';
  email= '';
  password = '';
  password2 = '';
  modify = false;
  isValidName = '';
  isValidLastname = '';
  isValidEmail = '';
  isValidPassword = '';
  isValidPassword2 = '';
  pswType='password';
  showAlert = false;
  showDigit = false;
  deleteDigit = '';
  isBtnConfirmDisabled = true;

  ngOnInit() {
    let username = localStorage.getItem('username');
    if(username != null){
      this.http.getUserData(username).subscribe({
        next:(response => {
          this.name = response.getName;
          this.email = response.getEmail;
          this.lastname = response.getLastname;
          this.password = response.getPassword;
        }), error: err => {
          console.log('alert' + err.message);
        }
      })
    }
  }

  onNameChange(){
    if(!this.name.trim())
      this.isValidName = 'is-invalid';
    else
      this.isValidName='is-valid';

  }
  onLastNameChange(){
    if(!this.lastname.trim())
      this.isValidLastname = 'is-invalid';
    else
      this.isValidLastname = 'is-valid';
  }
  onEmailChange(){
    if(!this.email.trim())
      this.isValidEmail = 'is-invalid';
    else
      this.isValidEmail = 'is-valid';
  }
  onPasswordChange(){
    //IMPLEMENT PASSWORD CRITERIAL
    if(!this.password.trim())
      this.isValidPassword = 'is-invalid';
    else
      this.isValidPassword = 'is-valid';

  }
  onPassword2Change(){
    if(!this.password2.trim())
      this.isValidPassword2 = 'is-invalid';
    else if(this.password2 != this.password)
      this.isValidPassword2='is-invalid';
    else
      this.isValidPassword2 = 'is-valid';
  }

  modifyData(){
    this.modify = true;
  }
  saveData(){
    let username = localStorage.getItem('username');
    console.log(username)
    if(username == null)
      username = '';
    this.http.updateUser(username, this.name, this.lastname, this.email, this.password).subscribe({
      next:(response)=>{
        console.log(response)
      },error: (err)=>{
        console.log(err.message);
    }
    })
    this.modify = false;
  }
  isSaveDisabled(){
    if(this.isValidPassword2 === 'is-valid' && this.isValidPassword === 'is-valid' && this.isValidEmail === 'is-valid'&&
      this.isValidLastname === 'is-valid' && this.isValidName === 'is-valid'){
      return false;
    }
    else
      return true;
  }
  hideShowPasswords() {
    const icon = document.getElementById("hideShow")
    if(this.pswType === 'password'){
      this.pswType = 'text';
      if(icon)
        icon.style.color='dodgerblue';
    }
    else{
      this.pswType = 'password';
      if(icon)
        icon.style.color='grey';
    }
  }

  //-----------------------------ALERT DELETE SECTION---------------
  delete(){
    this.showAlert = true;
    this.modify = false;
  }
  displayDigit(){

    this.showDigit = true;
  }
  abortDelete(){
    this.showDigit=false;
    this.showAlert = false;
  }
  onDeleteDigitChange(){
  let username = localStorage.getItem('username')
    if(this.deleteDigit){
      if(this.deleteDigit === username)
      this.isBtnConfirmDisabled = false;
    }
  }
  deleteUser(){
    this.showDigit = false;
     this.showAlert = false;
     this.http.deleteUser(this.deleteDigit).subscribe({
       next:(response)=>{
          localStorage.clear()
         this.router.navigate(['']);
       },error:(err)=>{
          console.log(err.message)
       }
     })
  }
}
