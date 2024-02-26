import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../service/httpRequest.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  btnDisabled:boolean = true;
  labelClassName:string = '';
  nome:string='';
  cognome:string='';
  username:string='';
  password:string='';
  email:string='';
  isPswValid:string = 'is-invalid';
  isValidUsername = 'is-invalid';
  iconType:number =0;
  usernames:string[]= [];

  constructor(private http:HttpRequestService) {
  }
  ngOnInit(): void {
    this.http.getAllUsernames().subscribe(data=>{
      this.usernames=data;
    });
  }

  getIconSrc():string{
    return 'assets/icon/' + this.iconType + '.png';
  }
  setIcon(iconType:number){
    console.log('dd')
    this.iconType = iconType;

  }

  onPswChange(){
    if(!this.password.trim()){
      this.isPswValid = 'is-invalid';
    }else{
      this.isPswValid = 'is-valid';
    }
  }
  onNameChanghe(){
    if(this.usernames.filter(user => user===this.username).length != 0){
      this.isValidUsername ='is-invalid';
      alert("Questo nome utente esiste già");
    }
    else
      this.isValidUsername = 'is-valid';
  }
  isBtnDisabled():boolean{
   return !(this.isValidUsername==='is-valid' && this.isPswValid == 'is-valid' && this.nome.trim() && this.cognome.trim()
   && this.email.trim());

  }
  register():void{

  }



}
