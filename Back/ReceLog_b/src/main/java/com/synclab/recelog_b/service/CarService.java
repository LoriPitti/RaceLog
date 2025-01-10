package com.synclab.recelog_b.service;

import com.synclab.recelog_b.entity.Car;
import com.synclab.recelog_b.entity.Track;
import com.synclab.recelog_b.exception.CarException;
import com.synclab.recelog_b.exception.TrackException;
import com.synclab.recelog_b.repository.CarRepo;
import com.synclab.recelog_b.service.security.JwtAuthFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarService {
    @Autowired
    CarRepo  carRepo;
    private static final Logger logger = LoggerFactory.getLogger(CarService.class);


    public void insertNewCar(Car car){

        if(!isCarExistButDeleted(car.getName())){
            carRepo.save(car);
            logger.info("Inserted new car");
        }
        else{
            logger.info("car already exists");
            Car c = carRepo.findByName(car.getName());
            c.setName(car.getName());
            c.setBrand(car.getBrand());
            c.setImgFront(car.getImgFront());
            c.setImgBack(car.getImgBack());
            c.setYear(car.getYear());
            carRepo.save(c);
        }
    }

    public void deleteCar(String name, Boolean isLogical) throws TrackException {
        //Se cancellazione logica
        if(isLogical){
            if(!isCarExist(name))
                throw new CarException("La vettura non  esiste");
            else
                carRepo.logicalDelete(name);
        }else{//Se cancellazione effettiva
            if(isCarExistButDeleted(name))
                carRepo.deleteByName(name);
        }
    }
    public List<String> getAllCarsName(){
        List<String>   list = carRepo.getAllCarsName();
        return new ArrayList<>(list.stream().filter(this::isCarExist).toList());
    };

    public List<Car> getAllCars(){

        List<Car> list  = carRepo.findAll();
        return new ArrayList<>(list.stream().filter(c-> isCarExist(c.getName())).toList());
    }

    public Car getCarByName(String name) throws TrackException {
        if(!isCarExist(name))
            throw  new TrackException("La vettura non esiste");
        return  carRepo.findByName(name);
    }

    public boolean isCarExistButDeleted(String name){
        Car c = carRepo.findByName(name);
        return c!= null;
    }

    public boolean isCarExist(String name){
        Car c = carRepo.findByName(name);
        if(c==null)
            return false;
        else return !isDeleted(c);
    }

    private boolean isDeleted(Car c){
        return c.isDeleted();
    }


    public List<String> getDeletedCarsName(){
        logger.info("Called getDeletedCarsName");
        return carRepo.findDeleted();
    }



}
