import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {HttpRequestService} from "../../service/httpRequest.service";

import {Track} from "../../Entity/Track";
import {Form} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-load-track',
  templateUrl: './load-track.component.html',
  styleUrl: './load-track.component.css'
})
export class LoadTrackComponent implements OnInit{
  name='';
  country = '';
  trackLength='';
  dxTurn='';
  sxTurn:string = '';
  tracksName:string[]= [];
  isValidName:string = 'is-invalid';
  showAlert: boolean =false;
  alertType: string = 'danger';
  message: string = '';
  isValidTrackLength: string = 'is-invalid';
  isValidSx:string = 'is-invalid';
  isValidDx:string = 'is-invalid';
  fileBytes1:Uint8Array =new Uint8Array;
  fileBytes2:Uint8Array =new Uint8Array;
  fileBlob1:Blob = new Blob();
  fileBlob2:Blob = new Blob();
  file1:FormData = new FormData();
  file2 :FormData = new FormData();

  isImg1=false;

  isImg2=false;


  constructor(private http: HttpRequestService,private  router:Router, private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    if(this.route.snapshot.params['d'] === '1')
      this.displayAlert('Pista inserita correttamente', 'success');
    this.http.getAllTracksName().subscribe(data=>{
      this.tracksName=data;
    });
  }


//-----------------------------MENAGE THE INPUT DATA-------------------------------------------------
  onNameChange() {
    if(this.tracksName.filter(name=>name.toLowerCase() === this.name.toLowerCase()).length !=0){
      this.displayAlert('Questa pista è già stata inserita', 'danger')
      this.isValidName='is-invalid';
    }
    else if(!this.name.trim())
      this.isValidName = 'is-invalid';
    else
      this.isValidName='is-valid';
  }
  onCountryChange() {

  }
  onTrackLengthChange(){
    const regex = /^[0-9]+$/;
    if(this.trackLength.trim()){
      if(regex.test(this.trackLength)){
        this.isValidTrackLength='is-valid'
        return;
      }
    }
    this.displayAlert('La lunghezza deve essere numerica','danger');
    this.isValidTrackLength='is-invalid'
  }
  onSxChange() {
    const regex = /^[0-9]+$/;
    if(this.sxTurn.trim()){
      if(regex.test(this.sxTurn)){
        this.isValidSx='is-valid'
        return;
      }
    }
    this.displayAlert('Numero di curve non valido','danger');
    this.isValidSx='is-invalid'
  }

  onDxChange() {
    const regex = /^[0-9]+$/;
    if(this.dxTurn.trim()){
      if(regex.test(this.dxTurn)){
        this.isValidDx='is-valid'
        return;
      }
    }
  this.displayAlert('Numero di curve non valido', 'danger');
    this.isValidDx='is-invalid'
  }


  onHideChange($event: boolean) {
    this.showAlert=false;
  }
//------------------------------------------METHOD TO SELECT AND MANAGE IMG ------------------------------------------
  onFileSelected(event: any, n: number) {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      //check if it's an image
      if (this.isImage(file)) {
        const reader = new FileReader();
        reader.onload = () => {
          const contentArrayBuffer = reader.result as ArrayBuffer;
          const blob = new Blob([contentArrayBuffer], { type: file.type });
          if (n == 1) {
            this.fileBlob1 = blob;
            this.isImg1 = true;
          } else {
            this.fileBlob2 = blob;
            this.isImg2 = true;
          }
        };

        // Avvia la lettura del file
        reader.readAsArrayBuffer(file);
      } else {
        this.displayAlert('Il file deve essere un\'immagine', 'danger');
      }
    }
  }
  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  //-------------------------------------------SHOW ALERT------------------------
  private displayAlert(msg:string, type:'danger'|'success'){
    this.showAlert=true;
    this.alertType=type;
    this.message=msg;
  }

  //-------------------------------------------BTN METHOD-----------------------------------------------------------
  isBtnDisabled() {
    return !(this.isValidName === 'is-valid' && this.isValidTrackLength === 'is-valid' && this.isValidDx === 'is-valid' && this.isValidSx === 'is-valid' && this.country.trim() && this.isImg1 && this.isImg2);
  }

  //call HTTPService to sent track to backend
  loadTrack() {
    this.http.loadTrack(new Track(this.name, this.country, this.fileBlob1, this.fileBlob2, parseInt(this.trackLength), parseInt(this.sxTurn),  parseInt(this.dxTurn)))
      .subscribe({
        next: (response=>{
          console.log(response)
            this.reloadCurrentRoute();
        }),
        error: (msg => {
          this.displayAlert(msg, 'danger');
        })
      });

  }
  reloadCurrentRoute() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { d: '1' },
      queryParamsHandling: 'merge'
    });
  }

}
