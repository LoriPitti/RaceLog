package com.synclab.recelog_b.cotroller.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.synclab.recelog_b.Util.GeneralUtil;
import com.synclab.recelog_b.cotroller.Api.CarApi;
import com.synclab.recelog_b.cotroller.CarData;
import com.synclab.recelog_b.entity.Car;
import com.synclab.recelog_b.exception.TrackException;
import com.synclab.recelog_b.service.CarService;
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
public class CarController implements CarApi {
    @Autowired
    GeneralUtil generalUtil;
    @Autowired
    CarService carService;


    public String getAllCarsName(){
        try {
            return generalUtil.toJson(carService.getAllCarsName());
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    public String getAllCars(){
        try {
            List<Car> cars = carService.getAllCars();
            List<CarData> carsData = new ArrayList<>();
            cars.forEach(car -> {
                carsData.add(new CarData(car.getName(), car.getBrand(),
                        Base64.getEncoder().encodeToString(car.getImgBack()),
                        Base64.getEncoder().encodeToString(car.getImgFront()),
                        String.valueOf(car.getYear())));
            });
            return generalUtil.toJson(carsData);

        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel parsing di json");
        }
    }

    public String getCarByName(String name)  {
        Car car = null;
        try {
            car = carService.getCarByName(name);
        } catch (TrackException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La vettura non è stata inserita nel database");
        }
        byte[] imgBack= car.getImgBack();
        byte[] imgFront= car.getImgFront();
        return "{\"name\":\""+car.getName() + "\"," +
                "\"brand\" : \""+car.getBrand() + "\"," +
                "\"imgBack\" : \"" +Base64.getEncoder().encodeToString(imgBack)+"\"," +
                "\"imgFront\" : \""+Base64.getEncoder().encodeToString(imgFront)+"\"," +
                "\"year\" : \"" +car.getYear()+"\"}";
    }
}
