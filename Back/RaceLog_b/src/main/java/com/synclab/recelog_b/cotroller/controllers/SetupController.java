package com.synclab.recelog_b.cotroller.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.synclab.recelog_b.cotroller.Api.SetupApi;
import com.synclab.recelog_b.entity.Setup;
import com.synclab.recelog_b.exception.SetupException;
import com.synclab.recelog_b.service.SetupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SetupController implements SetupApi {
    @Autowired
    SetupService setupService;


    public String getSetup(String username,
                           String track,
                           String car,
                           int type){
        return  setupService.getSetup(username,track,car,type);

    }

    public ResponseEntity<Integer> saveSetup(String setup, String username,
                                             String track,
                                             String car,
                                             int type,
                                             String lap) throws JsonProcessingException, SetupException {
        setupService.addSetup(username,lap, track,car,type,setup);

        return ResponseEntity.ok(200);
    }
}
