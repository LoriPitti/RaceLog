package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.Dry_record;
import com.synclab.recelog_b.entity.Wet_record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WetRepo extends JpaRepository<Wet_record, Integer> {
    List<Wet_record> findAllByUsername(String username);
}
