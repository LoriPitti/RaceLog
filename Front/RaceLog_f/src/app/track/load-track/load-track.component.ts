import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {HttpRequestService} from "../../service/httpRequest.service";

import {Track} from "../../Entity/Track";
import {Form} from "@angular/forms";

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


  constructor(private http: HttpRequestService) {
  }



  onNameChange() {
    if(this.tracksName.filter(name=>name === this.name).length !=0){
      this.displayAlert('Questa pista è già stata inserita')
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
    this.displayAlert('La lunghezza deve essere numerica');
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
    this.displayAlert('Numero di curve non valido');
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
  this.displayAlert('Numero di curve non valido');
    this.isValidDx='is-invalid'
  }

  ngOnInit(): void {
    this.http.getAllTracksName().subscribe(data=>{
      this.tracksName=data;
    });
  }

  onHideChange($event: boolean) {
    this.showAlert=false;
  }
//------------------------------METHOD TO SELECT AND MANAGE IMG ------------------------------------------
  onFileSelected(event: any, n: number) {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      //controlla che sia un'immagine
      if (this.isImage(file)) {
        const reader = new FileReader();
        reader.onload = () => {
          console.log("LLLLL");
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
        this.displayAlert('Il file deve essere un\'immagine');
      }
    }
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  //----------------------------------SHOW ALERT
  private displayAlert(msg:string){
    this.showAlert=true;
    this.alertType='danger';
    this.message=msg;
  }

  isBtnDisabled() {
    return !(this.isValidName === 'is-valid' && this.isValidTrackLength === 'is-valid' && this.isValidDx === 'is-valid' && this.isValidSx === 'is-valid' && this.country.trim() && this.isImg1 && this.isImg2);
  }


  //call HTTPService to sent track to backend
  loadTrack() {
    this.http.loadTrack(new Track(this.name, this.country, this.fileBlob1, this.fileBlob2, parseInt(this.trackLength), parseInt(this.sxTurn),  parseInt(this.dxTurn))).subscribe();

  }

}
