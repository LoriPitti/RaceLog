package com.synclab.recelog_b.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="user")
@AllArgsConstructor
@NoArgsConstructor(force = true)
/**
 * User:  type 0, Admin: type 1
 */
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String username;
    private String password;
    private String email;
    private String name;
    private String lastname;
    private int iconType;  //default value = 0
    private int userType;
    private String token;

}
