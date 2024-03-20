package com.synclab.recelog_b.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "setup")
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class Setup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name="username", nullable = false)
    private String username;
    private String track;
    private String car;
    private String lap;
    private int type; //0 = dry, 1 = wet
    private  String setup;
}
