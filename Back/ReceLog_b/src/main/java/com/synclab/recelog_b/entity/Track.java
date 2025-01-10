package com.synclab.recelog_b.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Table(name="track")
@AllArgsConstructor
@NoArgsConstructor
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String country;
    @Lob
    private byte[] imgBack;
    @Lob
    private byte[] imgFront;
    private int length;
    private int cornerL;
    private int cornerR;
}