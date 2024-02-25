package com.synclab.recelog_b.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "")
@Data
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String country;
    private int  imgBackId;
    private int imgFrontId;
    private String length;
    private String cornerL;
    private String corneR;

}
