package com.synclab.recelog_b.repository;

import com.synclab.recelog_b.entity.Track;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrackRepo extends JpaRepository<Track, Integer> {


    @Query("select name from Track ")
    List<String> getAllTracksName();

    Track findByName(String name);

    @Transactional
    @Modifying
    @Query("update Track set deleted  = true where name=:name")
    Integer logicalDelete(@Param("name")String name);

    @Query("select t.name from Track t where t.deleted =true")
    List<String> findDeleted();


    @Transactional
    @Modifying
    @Query("delete from Track t where t.name =:name")
    void deleteByName(@Param("name")String name);

    @Transactional
    @Modifying
    @Query("update Track set deleted=false where name=:name")
    void restore(@Param("name")String name);


}
