import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({providedIn:'root'})
export class HttpRequestService{
  constructor(private http:HttpClient) {
  }

  getAllUsernames(): Observable<string[]> {
    return this.http.get<any[]>("http://localhost:8080/usernames");
  }
}
