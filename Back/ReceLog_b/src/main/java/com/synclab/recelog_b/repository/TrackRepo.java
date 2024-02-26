package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.Track;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackRepo extends JpaRepository<Track, Integer> {
    boolean existsByName(String username);

}
