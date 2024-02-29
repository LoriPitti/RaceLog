import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {Track} from "../Entity/Track";
import {TrackDisplay} from "../Entity/TrackDisplay";
import {DomSanitizer} from "@angular/platform-browser";

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

  //------------------------------------------SERVICE FOR TRACK
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



}
