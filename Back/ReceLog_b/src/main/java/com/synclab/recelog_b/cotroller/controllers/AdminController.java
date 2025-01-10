package com.synclab.recelog_b.cotroller.controllers;

import com.synclab.recelog_b.cotroller.Api.AdminApi;
import com.synclab.recelog_b.entity.Car;
import com.synclab.recelog_b.entity.Track;
import com.synclab.recelog_b.service.CarService;
import com.synclab.recelog_b.service.TrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AdminController implements AdminApi {

    @Autowired
    CarService carService;
    @Autowired
    TrackService trackService;

    public ResponseEntity<Integer> insertNewTrack(
            String name,
            String country,
            MultipartFile imgBack,
            MultipartFile imgFront,
            int length,
            int cornerL,
            int cornerR
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
        trackService.insertNewTrack(new Track(1,name, country,imgBackContent, imgFrontContent, length, cornerL, cornerR));
        return ResponseEntity.ok(200);
    }

    public ResponseEntity<Integer> insertNewCar(
            String name,
            String brand,
            MultipartFile imgBack,
            MultipartFile imgFront,
          int year
    ) {
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
        carService.insertNewCar(new Car(1,name, brand,imgBackContent, imgFrontContent, year));
        return ResponseEntity.ok(200);
    }


    public ResponseEntity<Integer> deleteCar(String name){
        return  ResponseEntity.ok(200);
    }

}
