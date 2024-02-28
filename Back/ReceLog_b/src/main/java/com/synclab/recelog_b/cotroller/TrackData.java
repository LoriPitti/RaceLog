package com.synclab.recelog_b.cotroller;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TrackData {
    public TrackData(String name, String country, String[] imgBack, String[] imgFront, int length, int cornerL, int cornerR){
            this.name = name;
            this.country = country;
            this.length = length;
            this.cornerL = cornerL;
            this.cornerR = cornerR;
            this.imgBack = imgBack;
            this.imgFront  = imgFront;
        }
        private String name;
        private String country;
        private String[] imgBack;
        private String[] imgFront;
        private int length;
        private int cornerL;
        private int cornerR;

    }