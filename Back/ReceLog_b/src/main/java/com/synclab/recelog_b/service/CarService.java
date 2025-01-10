package com.synclab.recelog_b.service;

import com.synclab.recelog_b.entity.Car;
import com.synclab.recelog_b.exception.TrackException;
import com.synclab.recelog_b.repository.CarRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    @Autowired
    CarRepo  carRepo;

    public void insertNewCar(Car car){
        carRepo.save(car);
    }

    public Integer deleteCar(String name) throws TrackException {
        if(!isCarExist(name))
            throw new TrackException("La pista non  esiste");
        else
            return carRepo.deleteByName(name);
    }
    public List<String> getAllCarsName(){return carRepo.getAllCarsName();};

    public List<Car> getAllCars(){
        return carRepo.findAll();
    }

    public Car getCarByName(String name) throws TrackException {
        if(!isCarExist(name))
            throw  new TrackException("La vettura non esiste");
        return  carRepo.findByName(name);
    }

    public boolean isCarExist(String name){
        return carRepo.existsByName(name);

    }



}
