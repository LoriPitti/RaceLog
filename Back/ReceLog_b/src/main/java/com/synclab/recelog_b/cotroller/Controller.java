package com.synclab.recelog_b.cotroller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.synclab.recelog_b.entity.Image;
import com.synclab.recelog_b.entity.Track;
import com.synclab.recelog_b.entity.User;
import com.synclab.recelog_b.exception.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import com.synclab.recelog_b.service.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Controller {
    private ObjectMapper objectMapper;
    @Autowired
    Service service;


    //------------------------------------------USER SECTION-------------------------------------------------------------
    @GetMapping("/users")
    public String getAllUsers()  {
        try {
            return toJson(service.getAllUsers());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    @GetMapping("/usernames")
    public String geAllUsernames(){
        try {
            return toJson(service.getAllUsernames());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }
    @PostMapping("/user/login")
    public String logIn(@RequestBody String json){
        objectMapper = new ObjectMapper();
        try {
            LogData logData = objectMapper.readValue(json, LogData.class);

            return toJson(service.login(logData.username(),logData.password()));

        } catch (JsonProcessingException e) {
            throw  new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }catch (UserException e){
            switch (e.getMessage()){
                case "noFound":
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "L' utente non esiste");
                case "pswWrong":
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La password è errata, riprovare"); //TODO understand which status send
                default:
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore sconosciuto");
            }
        }
    }

    @PostMapping("user/signup")
    public String signUp(@RequestBody String json) {
        objectMapper = new ObjectMapper();
        User user = null;  //TODO --> merge parsing method
        UserObj userObj = null;
        try {
            userObj = objectMapper.readValue(json, UserObj.class);
            user = objectMapper.readValue(userObj.user(), User.class);

        } catch (JsonProcessingException e) {
            throw  new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");

        }
        if(service.isUsernameExists(user.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "L' utente esiste già");
        }
        if (service.signUpUser(user)) {
            MessageResponse response = new MessageResponse("Utente Registrato");
            try {
                return  toJson(response);
            } catch (JsonProcessingException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
            }
        }
        else
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore sconosciuto");

    }

    @PostMapping("user/delete")
    public String deleteUser(@RequestBody String json){
        objectMapper = new ObjectMapper();
        LogData logData = null;  //TODO --> merge parsing method
        try {
            logData = objectMapper.readValue(json, LogData.class);
            service.deleteByusername(logData.username(), logData.password());
            return "UserDeleted";
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        } catch (UserException e) {
            switch (e.getMessage()) {
                case "noFound":
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "L' utente non esiste");
                case "pswWrong":
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La password è errata, riprovare"); //TODO understand which status send
                default:
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore sconosciuto");
            }
        }
    }
    private String toJson(Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }
    @PostMapping("/user/update/update")
    public String updateUser(@RequestBody String json){
    //TODO capire come organizzare la fase di update
        return "/";
    }

    // --------------------------------------------ADMIN SECTION----------------------------------------------------
    @PostMapping("/admin/track/load")
    public String insertNewTrack(@RequestBody String json){
        objectMapper = new ObjectMapper();
        try{
            Track track = objectMapper.readValue(json, Track.class);
            if(service.isTrackExist(track.getName())){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Questa pista è già stata inserita");
            }else{
                service.insertNewTrack(track);
                return "Pista inserita";
            }
        }catch (JsonProcessingException ex){
            System.out.println(ex.getMessage());
            throw  new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
        // TODO - --> complete this
    }

    //--------------------------------------------GENERAL ----------------------------------------------------------
    @GetMapping("/tracks")
    public String getAllTracks(){
        try {
            return toJson(service.getAllTracks());
        } catch (JsonProcessingException e) {
           throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    @GetMapping("/tracksname")
    public String getAllTracksName(){
        try {
            return toJson(service.getAllTracksName());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }
    @PostMapping("tracks/load")
    public String loadTrack(@RequestBody String json) {
        objectMapper = new ObjectMapper();
        Track track = null;  //TODO --> merge parsing method
        TrackObj trackObj = null;
        try {
            System.out.println("parsed");
            track = objectMapper.readValue(json, Track.class);


        } catch (JsonProcessingException e) {
            System.out.println("error" + e.getMessage());
            throw  new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");

        }
        if(service.isTrackExist(track.getCountry())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "L' utente esiste già");
        }
        if (service.insertNewTrack(track)) {
            MessageResponse response = new MessageResponse("Utente Registrato");
            try {
                return  toJson(response);
            } catch (JsonProcessingException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
            }
        }
        else
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore sconosciuto");

    }
}



