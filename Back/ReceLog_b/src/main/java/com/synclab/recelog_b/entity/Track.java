package com.synclab.recelog_b.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.Base64;

@Entity
@Data
@Table(name="track")
@NoArgsConstructor
@AllArgsConstructor
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String country;
    private byte[] imgBack;
    private byte[] imgFront;
    private int length;
    private int cornerL;
    private int cornerR;

    public Track(String name, String country, byte[] imgBackContent, byte[] imgFrontContent, int length, int cornerL, int cornerR) {
    }
}