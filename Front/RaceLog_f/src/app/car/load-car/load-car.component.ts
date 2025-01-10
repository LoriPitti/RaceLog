import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../../service/httpRequest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Track} from "../../Entity/Track";
import {Car} from "../../Entity/Car";

@Component({
  selector: 'app-load-car',
  templateUrl: './load-car.component.html',
  styleUrl: './load-car.component.css'
})
export class LoadCarComponent  implements OnInit{
  name='';
  brand = '';
  year='';
  carsName:string[]= [];
  isValidName:string = 'is-invalid';
  showAlert: boolean =false;
  alertType: string = 'danger';
  message: string = '';
  isValidYear: string = 'is-invalid';

  fileBytes1:Uint8Array =new Uint8Array;
  fileBytes2:Uint8Array =new Uint8Array;
  fileBlob1:Blob = new Blob();
  fileBlob2:Blob = new Blob();
  file1:FormData = new FormData();
  file2 :FormData = new FormData();

  isImg1=false;

  isImg2=false;
  exit  =false;

  constructor(private http: HttpRequestService,private  router:Router, private route:ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false  //TODO --> RESOLVE DEPRECATED METHON
  }
  ngOnInit(): void {
    if(this.route.snapshot.queryParams['insert'] === 'true')
      this.displayAlert('Vettura inserita correttamente', 'success');
    this.http.getAllCarsName().subscribe(data=>{
      this.carsName=data;
    });
  }


//-----------------------------MENAGE THE INPUT DATA-------------------------------------------------
  onNameChange() {
    //confronto eliminato anche gli spazi bianchi
    if(this.carsName.filter(name=>name.replace(/\s/g, '').toLowerCase() === this.name.replace(/\s/g, '').toLowerCase()).length !=0){
      this.displayAlert('Questa vettura è già stata inserita, se procedi sovrascriverai quella attuale', 'danger')
      this.isValidName = 'is-valid';
    }
    else if(!this.name.trim())
      this.isValidName = 'is-invalid';
    else
      this.isValidName='is-valid';
  }
  onBrandChange() {

  }
  onYearChange(){
    const regex = /^[0-9]+$/;
    if(this.year.trim()){
      if(regex.test(this.year)){
        this.isValidYear='is-valid'
        return;
      }
    }
    this.displayAlert('L \' anno deve essere espresso in numeri','danger');
    this.isValidYear='is-invalid'
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

  isBtnDisabled() {
    return !(this.isValidName === 'is-valid' && this.isValidYear === 'is-valid'  && this.brand.trim() && this.isImg1 && this.isImg2);
  }
  //-------------------------------------------BTN METHOD-----------------------------------------------------------


  loadTrack() {
    this.http.loadCar(new Car(this.name, this.brand, this.fileBlob1, this.fileBlob2, parseInt(this.year)))
      .subscribe({
        next: (response=>{
          console.log(response)
          this.router.navigate(['cars/load'], {queryParams: {insert: 'true'}});
        }),
        error: (msg => {
          this.displayAlert(msg, 'danger');
        })
      });
  }

  logOut($event: boolean) {
    if($event)
      this.exit = true;
  }
}
