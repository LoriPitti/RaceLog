package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.Setup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface SetupRepo extends JpaRepository<Setup, Integer> {

    @Query("SELECT setup from Setup  where username = ?1 and track = ?2 and  car = ?3 and type = ?4")
    String getSetup(String username, String track, String car, int type);

    @Modifying
    @Query("UPDATE Setup s SET s.setup = ?1 WHERE s.username = ?2 AND s.track = ?3 AND s.car = ?4  AND s.lap = ?5 AND s.type = ?6 " )
    int updateSetup(String setup, String user, String track, String car, String lap, int type);

}
