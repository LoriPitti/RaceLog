package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.Dry_record;
import com.synclab.recelog_b.entity.Wet_record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WetRepo extends JpaRepository<Wet_record, Integer> {
    List<Wet_record> findAllByUsername(String username);
    @Query("select track from Dry_record  where  username = ?1  and track = ?2 and car = ?3 and time = ?4")
    String findRecord(String username, String track, String car, String time);
}
