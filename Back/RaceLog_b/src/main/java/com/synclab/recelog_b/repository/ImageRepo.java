package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepo extends JpaRepository<Image, Integer> {
}
