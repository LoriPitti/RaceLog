import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
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

  //------------------------------------------SERVICE FOR TRACK
  getTracks(name:string): Observable<any> {
    return this.http.get<any>("http://localhost:8080/track/" + name)
      .pipe(
        map(data => {
          let track = new Track(
            data.name,
            data.country,
            new Blob([data.getImgBack], { type : 'plain/text' }),
            new Blob([data.getImgFront], { type : 'plain/text' }),
            parseInt(data.length),
            parseInt(data.cornerL),
            parseInt(data.cornerR))
            console.log("val:"+data.getImgBack)
          }),
        catchError(err => {
          let msg:string  = '';
          switch (err.status){
            case 404:
              msg = 'Pista non esistente';
              break;
            case 500:
              msg ="Internal Server Error";
              break;
            default:
              msg='Unknown error';
              break;
          }
          return of(msg);
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
    return this.http.post<Uint8Array>("http://localhost:8080/admin/track/load", formData )
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
  private generateFormDataFromBlob(formData:FormData, blob: Blob, fileName: string): FormData {


    return formData;
  }

}
