package com.synclab.recelog_b.cotroller.Api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

public interface CarApi {

    @GetMapping("/carsname")
    String getAllCarsName();

    @GetMapping("/cars")
    String getAllCars();

    @GetMapping("/car/{name}")
    String getCarByName(@PathVariable String name);
}
