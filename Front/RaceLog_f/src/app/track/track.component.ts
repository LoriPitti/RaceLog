import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from "../service/httpRequest.service";
import {User} from "../Entity/User";
import {Track} from "../Entity/Track";


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent implements OnInit{

  imgUrl:string = '';
  constructor(private http: HttpRequestService) {
  }

  ngOnInit(): void {
    this.http.getTracks('TEST').subscribe({
      next: (response: Track) => {
        const imgBackBlob = response.getImgBack; // Assicurati che getImgBack() restituisca un Blob valido
        console.log(typeof response.getImgBack)
          this.imgUrl = URL.createObjectURL(new Blob([imgBackBlob], { type: 'text/plain' })); // Assicurati che createObjectURL venga chiamato con un Blob

      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

}
