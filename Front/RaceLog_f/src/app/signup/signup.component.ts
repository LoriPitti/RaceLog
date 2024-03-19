import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../service/httpRequest.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

import {User} from "../Entity/User";
import {Router} from "@angular/router";

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
  showAlert=false;
  alertType='danger';
  message:string='';
  constructor(private http:HttpRequestService, private router:Router) {
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
      this.showAlert=true;
      this.alertType='danger';
      this.message='Questo nome utete esiste già';
    }
    else if(!this.username.trim())
      this.isValidUsername = 'is-invalid';
    else
      this.isValidUsername='is-valid';
  }
  isBtnDisabled():boolean{
   return !(this.isValidUsername==='is-valid' && this.isPswValid == 'is-valid' && this.nome.trim() && this.cognome.trim()
   && this.email.trim() && this.iconType!=0);

  }
  register(): void {
    const user = JSON.stringify(new User(this.username, this.password, this.email, this.nome, this.cognome, this.iconType));
    this.http.signup(user).subscribe({
      next: (response) => {
        this.showAlert=true;
        this.alertType='success';
        this.message=response.message;
        this.sendEmail('lori.pitti.01@gmail.com','prova', 'prova');
      },
      error: (err) => {
        this.showAlert=true;
        this.alertType='danger';
        this.message=err;
      }
    });
  }

  onHideChange($event: boolean) {
    this.showAlert=false;
    if(this.alertType === 'success')
      this.router.navigate(['/login']);
  }

  sendEmail(destinatario: string, oggetto: string, testo: string) {
    const subject = encodeURIComponent(oggetto);
    const body = encodeURIComponent(testo);
    const mailtoLink = `mailto:${destinatario}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  }
}
