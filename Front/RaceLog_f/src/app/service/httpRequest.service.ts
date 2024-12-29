import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {Track} from "../Entity/Track";
import {TrackDisplay} from "../Entity/TrackDisplay";
import {DomSanitizer} from "@angular/platform-browser";
import {Car} from "../Entity/Car";
import {CarDisplay} from "../Entity/CarDisplay";
import {User} from "../Entity/User";
import {DryWet_record} from "../Entity/DryWet_record";
import {CarTimes} from "../Entity/CarTimes";
import {Setup} from "../Entity/Setup";
import {UserData} from "../Entity/UserData";

@Injectable({providedIn:'root'})
export class HttpRequestService{

  constructor(private http:HttpClient, private sanitizer: DomSanitizer) {
  }
  //ottengo il cookie del token
   private getCookie(name: string): string | null {
     const value = `; ${document.cookie}`;
       const parts = value.split(`; ${name}=`);
       if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
       return null;
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
                          response.name, response.lastname, response.iconType, response.userType, response.token);
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
    //prelevo token e creo   header
    const token = this.getCookie('jwt_token');
    let headers =  new HttpHeaders();
    if(token){
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<any>("http://localhost:8080/user", {params:params, headers:headers}).pipe(
      map(response=>{ console.log(response.username); return new User(response.username, response.password, response.email, response.name, response.lastname, response.iconType, response.userType, '-')}),
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
  getUsersData(){
     //prelevo token e creo   header
        const token = this.getCookie('jwt_token');
        let headers =  new HttpHeaders();
        if(token){
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
    return this.http.get<any[]>("http://localhost:8080/users", {headers:headers}).pipe(
      map(response =>{
        return response.map(item=>{
          return new UserData(item.username, item.name, item.lastname, item.iconType);
        })
      } ),
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
     //prelevo token e creo   header
        const token = this.getCookie('jwt_token');
        let headers =  new HttpHeaders();
        if(token){
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
    const params =new HttpParams()
      .set("username",username)
      .set("name", name)
      .set("lastname",lastname)
      .set("email", email)
      .set("password", password);
    console.log(params)
    return this.http.post("http://localhost:8080/user/update", {},{params:params, headers:headers}).pipe(
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
     //prelevo token e creo   header
        const token = this.getCookie('jwt_token');
        let headers =  new HttpHeaders();
        if(token){
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
    const params = new HttpParams()
      .set("username", username);
    return this.http.delete<any>("http://localhost:8080/user/delete", {params:params, headers:  headers}).pipe(
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
  getTracksForUser(username:string ,type:'dry'|'wet'){
     //prelevo token e creo   header
        const token = this.getCookie('jwt_token');
        let headers =  new HttpHeaders();
        if(token){
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
    const params = new HttpParams()
      .set("username", username)
      .set("type", type);
    return this.http.get<string[]>("http://localhost:8080/user/records/tracks",{params:params, headers:headers}).pipe(
      map(response => {
        console.log("respinse "+ response)
        return response
      }),
      catchError(err => {
        let msg: string = '';
        switch (err.status) {
          case 400:
            msg ="Tipo non supportato in input";
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
  //--------------------------------------USER RECORD---------------------------------------------------------
  getUserRecords(username : string, type:'dry'|'wet'){
     //prelevo token e creo   header
        const token = this.getCookie('jwt_token');
        let headers =  new HttpHeaders();
        if(token){
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
    const params = new HttpParams()
      .set("username", username)
      .set("type", type);
    return this.http.get<any[]>("http://localhost:8080/user/records/get", { params: params, headers: headers }) .pipe(
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
     //prelevo token e creo   header
        const token = this.getCookie('jwt_token');
        let headers =  new HttpHeaders();
        if(token){
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
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
    }, {headers:headers}).pipe(map((response:HttpResponse<any>) => {
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
   //prelevo token e creo   header
      const token = this.getCookie('jwt_token');
      let headers =  new HttpHeaders();
      if(token){
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    return this.http.delete<any>(url, {body : body, headers:headers}).pipe(
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
     //prelevo token e creo   header
        const token = this.getCookie('jwt_token');
        let headers =  new HttpHeaders();
        if(token){
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
    const params = new HttpParams()
      .set("username", username)
      .set("track", track)
      .set("type", type);
    return this.http.get<any[]>("http://localhost:8080/user/records/times",{params:params, headers}).pipe(
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
     //prelevo token e creo   header
        const token = this.getCookie('jwt_token');
        let headers =  new HttpHeaders();
        if(token){
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
    return this.http.get<any>("http://localhost:8080/track/" + name, {headers:headers} )
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
     //prelevo token e creo   header
        const token = this.getCookie('jwt_token');
        let headers =  new HttpHeaders();
        if(token){
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
    return this.http.get<any[]>("http://localhost:8080/tracks", {headers:headers})
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
     //prelevo token e creo   header
        const token = this.getCookie('jwt_token');
        let headers =  new HttpHeaders();
        if(token){
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
    const params = new HttpParams()
      .set("username", username)
      .set("track", track)
      .set("type", type);
    return this.http.get<any[]>("http://localhost:8080/track/cars",{params:params, headers: headers} ).pipe(
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
     //prelevo token e creo   header
            const token = this.getCookie('jwt_token');
            let headers =  new HttpHeaders();
            if(token){
              headers = headers.set('Authorization', `Bearer ${token}`);
            }
    return this.http.get<any[]>("http://localhost:8080/cars", {headers:headers})
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
     //prelevo token e creo   header
            const token = this.getCookie('jwt_token');
            let headers =  new HttpHeaders();
            if(token){
              headers = headers.set('Authorization', `Bearer ${token}`);
            }
    return this.http.get<any>("http://localhost:8080/car/" + name, {headers:headers} )
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
     //prelevo token e creo   header
            const token = this.getCookie('jwt_token');
            let headers =  new HttpHeaders();
            if(token){
              headers = headers.set('Authorization', `Bearer ${token}`);
            }
    let formData = new FormData();
    formData.append('name', track.getName);
    formData.append('country', track.getCountry);
    formData.append('length', track.getTLength.toString());
    formData.append('cornerL', track.getCornerL.toString());
    formData.append('cornerR', track.getCornerR.toString());
    formData.append('imgBack', track.getImgBack, 'back.jpg'); // Aggiungi l'immagine 'imgBack' come file
    formData.append('imgFront', track.getImgFront, 'front.jpg');
    return this.http.post<any>("http://localhost:8080/admin/track/load", formData, {headers:headers} )
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
     //prelevo token e creo   header
            const token = this.getCookie('jwt_token');
            let headers =  new HttpHeaders();
            if(token){
              headers = headers.set('Authorization', `Bearer ${token}`);
            }
    return this.http.post<any>("http://localhost:8080/admin/car/load", formData, {headers:headers} )
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
  //---------------------------------SETUP-------------------------------------
  getSetup(username:string, track:string, car:string, type:number){
    console.log(username +' '+ track + ' '+ car + ' '+type)
    const params = new HttpParams()
      .set("user", username)
      .set("track", track)
      .set("car", car)
      .set("type",type);
       //prelevo token e creo   header
              const token = this.getCookie('jwt_token');
              let headers =  new HttpHeaders();
              if(token){
                headers = headers.set('Authorization', `Bearer ${token}`);
              }
    return this.http.get<Setup>("http://localhost:8080/setup/get", {params:params, headers:headers}).pipe(
      map(response=>{
        return response;
      }),  catchError(err => {
        let msg: string = '';
        switch (err.status) {
          case 400:
            msg = 'il setup esiste già';
            break;
          case 500:
            msg = 'Internal Server Error';
            break;
          default:
            msg = 'Errore Sconosciuto';
            break;
        }
        return throwError(() => msg)
      })
    )
  }
  saveSetup(username:string, track:string, car:string, type:number, lap:string, setup:Setup){
    const params = new HttpParams()
      .set("username", username)
      .set("track", track)
      .set("car", car)
      .set("type",type)
      .set("lap",lap);
       //prelevo token e creo   header
              const token = this.getCookie('jwt_token');
              let headers =  new HttpHeaders();
              if(token){
                headers = headers.set('Authorization', `Bearer ${token}`);
              }
    return this.http.post<any>("http://localhost:8080/setup/post", {
      setup
    },{params:params, headers:headers}).pipe(
      map(response=>{
        return response;
      }),  catchError(err => {
        let msg: string = '';
        switch (err.status) {
          case 400:
            msg = 'il setup esiste già';
            break;
          case 500:
            msg = 'Internal Server Error';
            break;
          default:
            msg = 'Errore Sconosciuto';
            break;
        }
        return throwError(() => msg)
      })
    )
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
