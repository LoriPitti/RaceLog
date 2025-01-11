package com.synclab.recelog_b.cotroller.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.synclab.recelog_b.Util.GeneralUtil;
import com.synclab.recelog_b.cotroller.Api.RecordApi;
import com.synclab.recelog_b.entity.Dry_record;
import com.synclab.recelog_b.entity.Wet_record;
import com.synclab.recelog_b.exception.RecordException;
import com.synclab.recelog_b.exception.UserException;
import com.synclab.recelog_b.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class RecordController implements RecordApi {

    @Autowired
    GeneralUtil generalUtil;
    @Autowired
    RecordService recordService;
    private ObjectMapper objectMapper = new ObjectMapper();
    public String getUserRecords(String username,String type)  {
        if(type.equals("dry")){
            try {
                return generalUtil.toJson(recordService.getUserDryRecord(username));

            } catch (UserException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "L' utente non esiste");

            } catch (JsonProcessingException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
            }
        }else if(type.equals("wet")){
            try {
                //call the service
                return generalUtil.toJson(recordService.getUserWetRecord(username));

            } catch (UserException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "L' utente non esiste");
            } catch (JsonProcessingException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
            }

        }else
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "tipo invalido");
    }

    public ResponseEntity<Integer> insertUserDryRecord(String json){
        objectMapper = new ObjectMapper();
        try {
            Dry_record dry_record = objectMapper.readValue(json, Dry_record.class);
            System.out.println(dry_record.getUsername());
            recordService.insertNewDryRecord(dry_record);
            return ResponseEntity.ok(200);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        } catch (Exception e) {
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST, "Il record è gia inserito");
        }
    }

    public ResponseEntity<Integer> insertUserWetRecord(String json){
        objectMapper = new ObjectMapper();
        try {
            Wet_record wet_record = objectMapper.readValue(json, Wet_record.class);
            recordService.insertNewWetRecord(wet_record);
            return ResponseEntity.ok(200);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        } catch (Exception e) {
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST, "Il record è gia inserito");
        }
    }

    public ResponseEntity<Integer> deleteDryRecord(String json) {
        objectMapper = new ObjectMapper();
        try {
            Dry_record dry_record = objectMapper.readValue(json, Dry_record.class);
            recordService.deleteRecord(dry_record.getUsername(), dry_record.getTrack(), dry_record.getCar(), dry_record.getTime(), "dry");
            return ResponseEntity.ok(200);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");

        } catch (RecordException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Il record non esiste");
        }
    }

    public ResponseEntity<Integer> deleteWetRecord(String json) {
        objectMapper = new ObjectMapper();
        try {
            Dry_record dry_record = objectMapper.readValue(json, Dry_record.class);
            recordService.deleteRecord(dry_record.getUsername(), dry_record.getTrack(), dry_record.getCar(), dry_record.getTime(), "wet");
            return ResponseEntity.ok(200);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");

        } catch (RecordException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Il record non esiste");
        }
    }

    public String getTimesByTrack(String username, String track, String type){
        try {
            return generalUtil.toJson(recordService.getTimesByTrack(username, track, type));
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while parsing to json");
        }

    }

    public List<String> getUsersTrack(String username,
                                      String type){
        if(!type.equals("dry") && !type.equals("wet"))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"type not supported");

        return recordService.getTracksForUser(username, type);
    }


    public String getCarsByTrack(String username, String track, String type){
        if(!type.equals("wet") && !type.equals("dry")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "type not supported");
        }
        try {
            return generalUtil.toJson(recordService.getCarsByTrack(username,track, type));
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "error while parsing json");
        }

    }


}
