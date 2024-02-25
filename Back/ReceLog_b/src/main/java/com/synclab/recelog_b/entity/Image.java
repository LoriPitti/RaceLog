package com.synclab.recelog_b.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;

@Data

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;
    private byte[] content;
}
