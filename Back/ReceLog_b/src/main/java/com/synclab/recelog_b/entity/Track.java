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
    @Column(name = "img_back", columnDefinition = "LONGBLOB")
    private byte[] imgBack;
    @Lob
    @Column(name = "img_front", columnDefinition = "LONGBLOB")
    private byte[] imgFront;
    private int length;
    private int cornerL;
    private int cornerR;
    private boolean deleted = false;
}