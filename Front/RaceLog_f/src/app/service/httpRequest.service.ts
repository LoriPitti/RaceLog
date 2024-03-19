import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {Track} from "../Entity/Track";
import {TrackDisplay} from "../Entity/TrackDisplay";
import {DomSanitizer} from "@angular/platform-browser";
import {Car} from "../Entity/Car";
import {CarDisplay} from "../Entity/CarDisplay";
import {User} from "../Entity/User";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {DryWet_record} from "../Entity/DryWet_record";
import {CarTimes} from "../Entity/CarTimes";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {webSocket} from "rxjs/webSocket";

@Injectable({providedIn:'root'})
export class HttpRequestService{

  constructor(private http:HttpClient, private sanitizer: DomSanitizer) {
  }


  //-------------------------SERVICE FOR USER-------------------------------------------------------
  getAllUsernames(): Observable<string[]> {
    return this.http.get<any[]>("http://localhost:8080/usernames");
  }
  getAllTracksName(): Observable<string[]> {
    return this.http.get<string[]>("http://localhost:8080/tracksname");
  }
  getAllCarsName(): Observable<string[]> {
    return this.http.get<string[]>("http://localhost:8080/carsname");
  }

  signup(user: string): Observable<any> {
    return this.http.post<string>("http://localhost:8080/user/signup", { user }).pipe(
      map(response=> {console.log(response);return response}),
      catchError(err => {
        let msg: string = '';
        switch (err.status) {
          case 400:
            msg = 'L\'utente è già stato inserito';
            break;
          case 500:
            msg = 'Internal Server Error';
            break;
          default:
            msg = 'Errore Sconosciuto';
            break;
        }
        return of(msg);
      })
    );
  }
  login(username: string, password: string){
    return this.http.post<any>("http://localhost:8080/user/login", {
      username: username,
      password: password
    }).pipe(
      map(response => {
          return new User(username, password, response,
                          response.name, response.lastname, response.iconType );
      }),catchError(err => {
        let msg: string = '';
        switch (err.status) {
          case 404:
            msg = 'L\'utente non esiste ';
            break;
          case 500:
            msg = 'Internal Server Error';
            break;
          case 400:
            msg = 'La password è errata'
            break;
          default:
            msg = 'Errore Sconosciuto';
            break;
        }
      throw new Error(msg)
      })

    );
  }

  getUserData(username:string){
    const params = new HttpParams()
      .set("username", username);
    return this.http.get<any>("http://localhost:8080/user", {params:params}).pipe(
      map(response=>{ console.log(response.username); return new User(response.username, response.password, response.email, response.name, response.lastname, response.iconType)}),
      catchError(err=> {
        let msg: string = '';
        switch (err.status) {
          case 400:
            msg = "L' utente non esiste";
            break;
          case 500:
            msg = 'Internal Server Error';
            break;
          default:
            msg = "Errore sconosciuto";
        }
        throw  new Error(msg);
      })
    )
  }

  public updateUser(username:string, name:string, lastname:string, email:string, password:string){
    const params =new HttpParams()
      .set("username",username)
      .set("name", name)
      .set("lastname",lastname)
      .set("email", email)
      .set("password", password);
    console.log(params)
    return this.http.post("http://localhost:8080/user/update", {},{params:params}).pipe(
      map(response =>{
        return "Utente aggiornato";
      }),catchError(err=> {
        let msg: string = '';
        switch (err.status) {
          case 400:
            msg = "L' utente non esiste";
            break;
          case 500:
            msg = 'Internal Server Error';
            break;
          default:
            msg = "Errore sconosciuto";
        }
        throw  new Error(msg);
      })
    )
  }

  public deleteUser(username:string){
    const params = new HttpParams()
      .set("username", username);
    return this.http.delete<any>("http://localhost:8080/user/delete", {params:params}).pipe(
      map(response=>{
        return "Utente Eliminato";
      }),catchError(err=> {
        let msg: string = '';
        switch (err.status) {
          case 400:
            msg = "L' utente non esiste";
            break;
          case 500:
            msg = 'Internal Server Error';
            break;
          default:
            msg = "Errore sconosciuto";
        }
        throw  new Error(msg);
      })

    )
  }

  //--------------------------------------USER RECORD---------------------------------------------------------
  getUserDryRecords(username : string, type:'dry'|'wet'){
    const params = new HttpParams()
      .set("username", username)
      .set("type", type);
    return this.http.get<any[]>("http://localhost:8080/user/records/get", { params: params }) .pipe(
      map(response=>{
          return response.map(item => new DryWet_record(item.username, item.track, item.car, item.time))
        }
      ),catchError(err => {
        let msg: string = '';
        switch (err.status) {
          case 400:
            msg ="L' utente non esiste";
            break;
          case 500:
            msg = 'Internal Server Error';
            break;
          default:
            msg  = "Errore sconosciuto";
        }
        throw new Error(msg)
      })
    );
  }

  insertNewRecord(username:string, track:string, car:string, time:string, type:'w'|'d'){
    let url:string;
    if(type == 'd')
      url = "http://localhost:8080/user/records/dry/post";
    else
      url = "http://localhost:8080/user/records/wet/post";
    return this.http.post<HttpResponse<any>>(url, {
      'username': username,
      'track': track,
      'car': car,
      'time': time
    }).pipe(map((response:HttpResponse<any>) => {
      console.log(response)
      return 'Record registrato';
    }), catchError(err => {
      let msg: string = '';
      switch (err.status) {
        case 400:
          msg = "Record già inserito";
          break;
        case 500:
          msg = 'Internal Server Error';
          break;
        default:
          msg = "Errore sconosciuto";
      }
      throw new Error(msg)
    }))
  }
  deleteRecord(username: string, track:string, car:string, time:string, type:'w' |'d'){
    let url:string;
    if(type ==='d'){
      url =  "http://localhost:8080/user/records/dry/delete";
    }
    else{
      url =  "http://localhost:8080/user/records/wet/delete";
    }
    const body = {
      'username' : username,
      'track' : track,
      'car' : car,
      'time' : time
    }
    return this.http.delete<any>(url, {body : body}).pipe(
      map((response:HttpResponse<any>)=>{
        console.log(response)
        return 'Record eliminato';
      }),catchError(err =>{
        let msg: string = '';
        switch (err.status) {
          case 400:
            msg = "Record non esistente";
            break;
          case 500:
            msg = 'Internal Server Error';
            break;
          default:
            msg = "Errore sconosciuto";
        }
        throw new Error(msg)
      }));
  }
  getTimesForTrack(username:string, track:string, type:string){
    const params = new HttpParams()
      .set("username", username)
      .set("track", track)
      .set("type", type);
    return this.http.get<any[]>("http://localhost:8080/user/records/times",{params:params}).pipe(
      map(response=>{
        return response.map(item=> new CarTimes(item.car, item.time))
    }),catchError(err => {
        let msg: string = '';
        switch (err.status) {
          case 400:
            msg ="L' utente non esiste";
            break;
          case 500:
            msg = 'Internal Server Error';
            break;
          default:
            msg  = "Errore sconosciuto";
        }
        throw new Error(msg)
      })
    )
  }
  //------------------------------------------SERVICE FOR TRACK-----------------------------------------------
  getSingleTrack(name:string): Observable<any> {
    return this.http.get<any>("http://localhost:8080/track/" + name )
      .pipe(
        map(response=>{
            let trackDisplay:TrackDisplay = {
              name : response.name,
              country : response.country,
              imgBackUrl : this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + response.imgBack),
              imgFrontUrl : this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + response.imgFront),
              tLength : response.length,
              cornerL : response.cornerL,
              cornerR : response.cornerR
            }
            return trackDisplay
          }
        )
      );
  }

  getAllTracks(): Observable<TrackDisplay[]> {
    return this.http.get<any[]>("http://localhost:8080/tracks")
      .pipe(
        map(response => {
          return response.map(item => ({
            name: item.name,
            country: item.country,
            imgBackUrl: this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + item.imgBack),
            imgFrontUrl: this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + item.imgFront),
            tLength: item.length,
            cornerL: item.cornerL,
            cornerR: item.cornerR,

          }
          ));
        })
      );
  }
  getCarsByTrack(username:string, track:string, type:string){
    const params = new HttpParams()
      .set("username", username)
      .set("track", track)
      .set("type", type);
    return this.http.get<any[]>("http://localhost:8080/track/cars",{params:params} ).pipe(
      map(response=>{
        return response;
      }),catchError(err => {
        let msg: string = '';
        switch (err.status) {
          case 400:
            msg = " Richista non valida";
            break;
          case 500:
            msg = 'Internal Server Error';
            break;
          default:
            msg = "Errore sconosciuto";
        }
        throw new Error(msg);
      }
    ))

  }

  //--------------------------------------SERVICE FOR CAR------------------------------------
  getAllCars(): Observable<CarDisplay[]> {
    return this.http.get<any[]>("http://localhost:8080/cars")
      .pipe(
        map(response => {
          return response.map(item => ({
              name: item.name,
              brand: item.brand,
              imgBackUrl: this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + item.imgBack),
              imgFrontUrl: this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + item.imgFront),
              year: item.year

            }
          ));
        })
      );
  }
  getSingleCar(name:string): Observable<any> {
    return this.http.get<any>("http://localhost:8080/car/" + name )
      .pipe(
        map(response=>{
            let carDisp:CarDisplay = {
              name : response.name,
              brand : response.brand,
              imgBackUrl : this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + response.imgBack),
              imgFrontUrl : this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + response.imgFront),
              year : response.year,
            }
            return carDisp;
          }
        )
      );
  }
  //-------------------------------------------SERVICE FOR ADMIN---------------------------
  loadTrack(track: Track){
    let formData = new FormData();
    formData.append('name', track.getName);
    formData.append('country', track.getCountry);
    formData.append('length', track.getTLength.toString());
    formData.append('cornerL', track.getCornerL.toString());
    formData.append('cornerR', track.getCornerR.toString());
    formData.append('imgBack', track.getImgBack, 'back.jpg'); // Aggiungi l'immagine 'imgBack' come file
    formData.append('imgFront', track.getImgFront, 'front.jpg');
    return this.http.post<any>("http://localhost:8080/admin/track/load", formData )
      .pipe(
        map(response=> {return 'Pista inserita correttamente'}),
        catchError(err => {
          let msg: string = '';
          switch (err.status) {
            case 400:
              msg = 'La pista è già stata inserita';
              break;
            case 500:
              msg = 'Internal Server Error';
               break;
            default:
              msg = 'Errore Sconosciuto';
              break;
          }
        return throwError(()=>msg);
      }));
  }

  loadCar(car: Car){
    let formData = new FormData();
    formData.append('name', car.getName());
    formData.append('brand', car.getBrand());
    formData.append('imgBack', car.getImgBack(), 'back.jpg'); // Aggiungi l'immagine 'imgBack' come file
    formData.append('imgFront', car.getImgFront(), 'front.jpg');
    formData.append('year', car.getYear().toString());
    return this.http.post<any>("http://localhost:8080/admin/car/load", formData )
      .pipe(
        map(response=> {return 'Vettura inserita correttamente'}),
        catchError(err => {
          let msg: string = '';
          switch (err.status) {
            case 400:
              msg = 'La vettura è già stata inserita';
              break;
            case 500:
              msg = 'Internal Server Error';
              break;
            default:
              msg = 'Errore Sconosciuto';
              break;
          }
          return throwError(()=>msg);
        }));
  }


  //-------------------------------SIM HUB CALL--------------------------------------
  getSimData(){
    return this.http.get<any>('http://8888/20778').pipe(
      map(response => {
        return "ccc"
      })
    );
  }



}
