package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepo extends JpaRepository<User, Integer> {
    User findByUsername(String username);

    boolean existsByUsername(String username);

    @Query("select id from User where username = ?1" )
    int getUserIdByUsername(String username);
    @Modifying
    @Query("UPDATE User SET name = ?1, lastname =?2, email =?3, password =?4 WHERE username = ?5")
    int updateUser(String name, String lastname, String email, String password, String username);

    @Query("select username from User")
    List<String> getAllUsernames();

    @Query("select userType from User  where username = ?1")
    Integer getUserType(String username);
}
