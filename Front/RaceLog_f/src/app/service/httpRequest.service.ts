import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {User} from "../Entity/User";
import {Track} from "../Entity/Track";

@Injectable({providedIn:'root'})
export class HttpRequestService{
  constructor(private http:HttpClient) {
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

  //-------------------------------------------SERVICE FOR ADMIN---------------------------
  loadTrack(track: Track){
    return this.http.post<Uint8Array>("http://localhost:8080/tracks/load", {
      'name':track.getName,
      'country':track.getCountry,
      'imgBack': this.convertByteArrayToString(track.getImgBack()),
      'imgFront': this.convertByteArrayToString(track.getImgFront()),
      'length':track.getTLength,
      'cornerL':track.getCornerL,
      'cornerR':track.getCornerR
    })
      .pipe(
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
      }));
  }
  convertByteArrayToString(byteArray: Uint8Array): string {
    return btoa(String.fromCharCode.apply(null, byteArray));
  }
}
