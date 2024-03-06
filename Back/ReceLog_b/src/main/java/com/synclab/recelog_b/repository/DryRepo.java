package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.Dry_record;
import com.synclab.recelog_b.entity.Wet_record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DryRepo extends JpaRepository<Dry_record, Integer> {

    List<Dry_record> findAllByUsername(String username);


}
