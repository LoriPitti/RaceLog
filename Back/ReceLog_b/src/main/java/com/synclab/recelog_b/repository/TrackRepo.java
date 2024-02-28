package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.Track;
import com.synclab.recelog_b.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TrackRepo extends JpaRepository<Track, Integer> {
    boolean existsByName(String name);

    @Query("select name from Track ")
    List<String> getAllTracksName();

    Track findByName(String name);
}
