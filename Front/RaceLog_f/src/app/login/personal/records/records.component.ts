import {Component, Input, OnInit} from '@angular/core';
import {IconSetService} from "@coreui/icons-angular";
import {HttpRequestService} from "../../../service/httpRequest.service";
import {cilArrowThickFromBottom, cilArrowThickFromTop, cilPlaylistAdd, cilPlus} from "@coreui/icons";
import {DryWet_record} from "../../../Entity/DryWet_record";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit{
  @Input()username = 'LoriPitti';
  dryRecords :DryWet_record[] = [];
  wetRecords:DryWet_record[] = [];
  finalTrackList:string[] = [];
  constructor(   public iconSet : IconSetService, private  http:HttpRequestService) {
    iconSet.icons = {cilArrowThickFromTop, cilArrowThickFromBottom, cilPlaylistAdd, cilPlus}
  }

  ngOnInit(): void {
    //get all dry records for user
    this.http.getUserDryRecords(this.username,'dry').subscribe( {
      next:(response: DryWet_record[]) =>{
        this.dryRecords = response;  //<-- assign dry record
      },error: (error) =>{
        console.log(error.message);
      }

    });
    //get all wet records
    this.http.getUserDryRecords(this.username,'wet').subscribe( {
      next:(response: DryWet_record[]) =>{
        this.wetRecords = response;  //<-- assign dry record
        this.extractTracks();
      },error: (error) =>{
        console.log(error.message);
      }
    });


  }

  private extractTracks(){
    let trackList1:string[] = [];
    //extract track from dry record
    this.dryRecords.forEach(record=>{
      trackList1.push(record.getTrack());
    })

    let trackList2:string[] = [];
    //extract track from wet record
    this.wetRecords.forEach(record=>{
      trackList2.push(record.getTrack());
    })
    this.finalTrackList =  Array.from(new Set(trackList1.concat(trackList2)));
  }

}
