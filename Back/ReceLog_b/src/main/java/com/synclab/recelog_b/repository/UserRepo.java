package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepo extends JpaRepository<User, Integer> {
    User findByUsername(String username);

    boolean existsByUsername(String username);

    @Query("select id from User where username = ?1" )
    int getUserIdByUsername(String username);
}
