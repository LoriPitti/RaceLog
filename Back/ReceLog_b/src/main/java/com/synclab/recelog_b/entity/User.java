package com.synclab.recelog_b.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String username;
    private String password;
    private String email;
    private String name;
    private String lastname;
    private int iconType;

}
