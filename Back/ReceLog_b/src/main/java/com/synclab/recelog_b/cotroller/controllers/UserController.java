package com.synclab.recelog_b.cotroller.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.synclab.recelog_b.Util.GeneralUtil;
import com.synclab.recelog_b.cotroller.Api.UserApi;
import com.synclab.recelog_b.cotroller.LogData;
import com.synclab.recelog_b.cotroller.MessageResponse;
import com.synclab.recelog_b.cotroller.UserObj;
import com.synclab.recelog_b.entity.User;
import com.synclab.recelog_b.exception.UserException;
import com.synclab.recelog_b.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController implements UserApi {

    @Autowired
    UserService  userService;
    @Autowired
    GeneralUtil generalUtil;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private ObjectMapper objectMapper;

    public String getAllUsers() {
        try {
            return generalUtil.toJson(userService.getAllUsers());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    public String getUserData(String username) {
        try {
            return generalUtil.toJson(userService.getUserData(username));
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    public String geAllUsernames() {
        try {
            return generalUtil.toJson(userService.getAllUsernames());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    public String logIn(String json) {
        logger.info("Attempt to login + json  {}", json);
        objectMapper = new ObjectMapper();
        try {
            LogData logData = objectMapper.readValue(json, LogData.class);

            return generalUtil.toJson(userService.login(logData.username(), logData.password()));

        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        } catch (UserException e) {
            switch (e.getMessage()) {
                case "noFound":
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "L' utente non esiste");
                case "pswWrong":
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La password è errata, riprovare");
                default:
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore sconosciuto");
            }
        }
    }

    public String signUp(String json) {
        objectMapper = new ObjectMapper();
        User user = null;
        UserObj userObj = null;
        try {
            userObj = objectMapper.readValue(json, UserObj.class);
            user = objectMapper.readValue(userObj.user(), User.class);

        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");

        }
        if (userService.isUsernameExists(user.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "L' utente esiste già");
        }
        if (userService.signUpUser(user)) {
            MessageResponse response = new MessageResponse("Utente Registrato");
            try {
                return generalUtil.toJson(response);
            } catch (JsonProcessingException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
            }
        } else
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore sconosciuto");

    }

    public ResponseEntity<Integer> deleteUser( String username) {
        try {
            userService.deleteByUsername(username);
            return ResponseEntity.ok(200);
        } catch (UserException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Integer> updateUser(String username,
                                              String name,
                                              String lastname,
                                              String email,
                                              String password) {
        try {
            userService.updateUser(username, name, lastname, email, password);
            return  ResponseEntity.ok(200);
        } catch (UserException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }




}
