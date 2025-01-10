package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.Car;
import com.synclab.recelog_b.entity.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CarRepo extends JpaRepository<Car, Integer> {
    @Query("select name from Car ")
    List<String> getAllCarsName();

    Car findByName(String name);

    boolean existsByName(String name);

    Integer deleteByName(String name);
}
