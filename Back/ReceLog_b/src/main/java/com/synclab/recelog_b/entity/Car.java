package com.synclab.recelog_b.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="car")
@Entity
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String brand;
    @Lob
    @Column(name = "img_back", columnDefinition = "LONGBLOB")
    private byte[] imgBack;
    @Lob
    @Column(name = "img_front", columnDefinition = "LONGBLOB")
    private byte[] imgFront;
    private int year;
    private boolean deleted =  false;
}
