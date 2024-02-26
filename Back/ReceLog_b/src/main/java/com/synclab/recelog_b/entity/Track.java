package com.synclab.recelog_b.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="track")
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String country;
    private String imgBack;
    private String imgFront;
    private int length;
    private int cornerL;
    private int cornerR;
}