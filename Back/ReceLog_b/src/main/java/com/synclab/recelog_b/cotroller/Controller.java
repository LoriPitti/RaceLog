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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.sql.Blob;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.stream.Stream;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Controller {
    private ObjectMapper objectMapper;
    @Autowired
    Service service;


    //------------------------------------------USER SECTION-------------------------------------------------------------
    @GetMapping("/users")
    public String getAllUsers() {
        try {
            return toJson(service.getAllUsers());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    @GetMapping("/usernames")
    public String geAllUsernames() {
        try {
            return toJson(service.getAllUsernames());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    @PostMapping("/user/login")
    public String logIn(@RequestBody String json) {
        objectMapper = new ObjectMapper();
        try {
            LogData logData = objectMapper.readValue(json, LogData.class);

            return toJson(service.login(logData.username(), logData.password()));

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

    @PostMapping("user/signup")
    public String signUp(@RequestBody String json) {
        objectMapper = new ObjectMapper();
        User user = null;  //TODO --> merge parsing method
        UserObj userObj = null;
        try {
            userObj = objectMapper.readValue(json, UserObj.class);
            user = objectMapper.readValue(userObj.user(), User.class);

        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");

        }
        if (service.isUsernameExists(user.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "L' utente esiste già");
        }
        if (service.signUpUser(user)) {
            MessageResponse response = new MessageResponse("Utente Registrato");
            try {
                return toJson(response);
            } catch (JsonProcessingException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
            }
        } else
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore sconosciuto");

    }

    @PostMapping("user/delete")
    public String deleteUser(@RequestBody String json) {
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
    public String updateUser(@RequestBody String json) {
        //TODO capire come organizzare la fase di update
        return "/";
    }

    // --------------------------------------------ADMIN SECTION----------------------------------------------------
    @PostMapping("/admin/track/load")
    public ResponseEntity<String> insertNewTrack(
            @RequestParam("name") String name,
            @RequestParam("country") String country,
            @RequestParam("imgBack") MultipartFile imgBack,
            @RequestParam("imgFront") MultipartFile imgFront,
            @RequestParam("length") int length,
            @RequestParam("cornerL") int cornerL,
            @RequestParam("cornerR") int cornerR
    ) {
        System.out.println("riceuto");
        byte[] imgBackContent;
        byte[] imgFrontContent;
        if (imgBack.isEmpty() || imgFront.isEmpty()) {
            System.out.println("file vuoti");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "I file immagine non possono essere vuoti");
        }
        try {
            imgBackContent = imgBack.getBytes();
            imgFrontContent = imgFront.getBytes();
        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nella lettura dei file");
        }
        service.insertNewTrack(new Track(name, country,imgBackContent, imgFrontContent, length, cornerL, cornerR));
        return ResponseEntity.ok("Pista inserita con successo");
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
    @GetMapping("/track/{name}")
    public String getTrackByName(@PathVariable String name){
        try{
           Track track = service.getTrackByName(name);
            String imgFront64 = Base64.getEncoder().encodeToString(track.getImgFront());
            
        }catch (JsonProcessingException e){
            throw  new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "errore nel parsing di json");
        }
    }



}



