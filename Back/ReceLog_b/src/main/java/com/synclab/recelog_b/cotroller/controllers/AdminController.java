package com.synclab.recelog_b.cotroller.controllers;

import com.synclab.recelog_b.Util.GeneralUtil;
import com.synclab.recelog_b.cotroller.Api.AdminApi;
import com.synclab.recelog_b.entity.Car;
import com.synclab.recelog_b.entity.Track;
import com.synclab.recelog_b.exception.CarException;
import com.synclab.recelog_b.service.CarService;
import com.synclab.recelog_b.service.TrackService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    @Autowired
    GeneralUtil generalUtil;
    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);


    /**
     * Admin method to insert new Track:  override if name already  exist
     * @param name
     * @param country
     * @param imgBack
     * @param imgFront
     * @param length
     * @param cornerL
     * @param cornerR
     * @return
     */
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
        trackService.insertNewTrack(new Track(1,name, country,imgBackContent, imgFrontContent, length, cornerL, cornerR, false));
        return ResponseEntity.ok(200);
    }

    /**
     * Admin method to insert new Track:  override if name already  exist
     * @param name
     * @param brand
     * @param imgBack
     * @param imgFront
     * @param year
     * @return
     */
    public ResponseEntity<Integer> insertNewCar(
            String name,
            String brand,
            MultipartFile imgBack,
            MultipartFile imgFront,
          int year
    ) {
        logger.info("API Insert new car received");
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
        carService.insertNewCar(new Car(1,name, brand,imgBackContent, imgFrontContent, year,false));
        return ResponseEntity.ok(200);
    }


    public ResponseEntity<Integer> deleteCar(String name,  Boolean isLogical){
        try{
            carService.deleteCar(name,   isLogical);
        }catch(CarException c){
            System.out.println(c.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La vettura " +name  +" non esiste");
        } catch (Exception e){
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nell'eliminazione della macchina");
        }
        return  ResponseEntity.ok(200);
    }


    public ResponseEntity<Integer> deleteTrack(String name, Boolean isLogical){
        logger.info("deleteTrack called with name {}", name);
        try{
            trackService.deleteTrack(name, isLogical);
        }catch(CarException c){
            System.out.println(c.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La pista " +name  +" non esiste");
        } catch (Exception e){
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nell'eliminazione della pista");
        }
        return  ResponseEntity.ok(200);
    }


    public String getCarsDeleted() {
        try {
            logger.info("Contoller: Called getCarsDeleted");
            return generalUtil.toJson(carService.getDeletedCarsName());
        }catch (Exception  e){
           throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel recupero delle vetture");
        }
    }

    public String getTracksDeleted() {
        try {
            logger.info("Contoller: Called getTracksDeleted");
            return generalUtil.toJson(trackService.getDeletedTracksName());
        }catch (Exception  e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel recupero deli tracciati");
        }
    }

}
