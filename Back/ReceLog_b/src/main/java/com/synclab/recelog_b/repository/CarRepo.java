package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.Car;
import com.synclab.recelog_b.entity.Track;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarRepo extends JpaRepository<Car, Integer> {
    @Query("select name from Car ")
    List<String> getAllCarsName();

    Car findByName(String name);


    @Transactional
    @Modifying
    @Query("update Car set deleted  = true where name=:name")
    Integer logicalDelete(@Param("name")String name);


    @Query("select distinct c.name from Car c  where c.deleted =  true")
    List<String> findDeleted();

    @Transactional
    @Modifying
    @Query("delete from Car c where c.name =:name")
    Integer deleteByName(@Param("name")String name);


}
