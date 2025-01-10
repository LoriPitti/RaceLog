package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.Track;
import com.synclab.recelog_b.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrackRepo extends JpaRepository<Track, Integer> {


    @Query("select name from Track ")
    List<String> getAllTracksName();

    Track findByName(String name);

    @Transactional
    @Modifying
    @Query("update Track set deleted  = true where name=:name")
    Integer logicalDelete(@Param("name")String name);


}
