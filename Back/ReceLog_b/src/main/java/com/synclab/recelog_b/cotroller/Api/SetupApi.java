package com.synclab.recelog_b.cotroller.Api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.synclab.recelog_b.exception.SetupException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

public interface SetupApi {


    @PostMapping("setup/post")
    ResponseEntity<Integer> saveSetup(@RequestBody String setup, @RequestParam("username")String username,
                                             @RequestParam("track")String track,
                                             @RequestParam("car")String car,
                                             @RequestParam("type")int type,
                                             @RequestParam("lap")String lap) throws JsonProcessingException, SetupException;

    @GetMapping("setup/get")
    String getSetup(@RequestParam("user")String username,
                           @RequestParam("track")String track,
                           @RequestParam("car")String car,
                           @RequestParam("type")int type);


}
