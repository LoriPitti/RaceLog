package com.synclab.recelog_b.cotroller.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.synclab.recelog_b.Util.GeneralUtil;
import com.synclab.recelog_b.cotroller.Api.TrackApi;
import com.synclab.recelog_b.cotroller.TrackData;
import com.synclab.recelog_b.entity.Track;
import com.synclab.recelog_b.exception.TrackException;
import com.synclab.recelog_b.service.TrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TrackController implements TrackApi {
    @Autowired
    TrackService trackService;
    @Autowired
    GeneralUtil generalUtil;


    public String getAllTracks(){
        try {
            List<Track> tracks = trackService.getAllTracks();
            List<TrackData> trackData = new ArrayList<>();
            tracks.forEach(track -> {
                trackData.add(new TrackData(track.getName(), track.getCountry(),
                        Base64.getEncoder().encodeToString(track.getImgBack()),
                        Base64.getEncoder().encodeToString(track.getImgFront()),
                        String.valueOf(track.getLength()), String.valueOf(track.getCornerL()), String.valueOf(track.getCornerR())));
            });
            return generalUtil.toJson(trackData);

        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }


    public String getAllTracksName(){
        try {
            return generalUtil.toJson(trackService.getAllTracksName());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }


    public String getTrackByName(String name)  {
        Track track = null;
        try {
            track = trackService.getTrackByName(name);
        } catch (TrackException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La pista non è stata inserita nel database");
        }
        byte[] imgBack= track.getImgBack();
        byte[] imgFront= track.getImgFront();
        return "{\"name\":\""+track.getName() + "\"," +
                "\"country\" : \""+track.getCountry() + "\"," +
                "\"imgBack\" : \"" +Base64.getEncoder().encodeToString(imgBack)+"\"," +
                "\"imgFront\" : \""+Base64.getEncoder().encodeToString(imgFront)+"\"," +
                "\"length\" : \""+track.getLength() + "\"," +
                "\"cornerL\" : \""+track.getCornerL() +"\","+
                "\"cornerR\" : \"" +track.getCornerR()+"\"}";
    }


}
