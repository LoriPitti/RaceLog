package com.synclab.recelog_b.cotroller.Api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface RecordApi {

    @GetMapping("user/records/get")
    String getUserRecords(@RequestParam("username")String username, @RequestParam("type") String type);

    @PostMapping("user/records/dry/post")
    ResponseEntity<Integer> insertUserDryRecord(@RequestBody String json);

    @PostMapping("user/records/wet/post")
    ResponseEntity<Integer> insertUserWetRecord(@RequestBody String json);

    @DeleteMapping("user/records/dry/delete")
    ResponseEntity<Integer> deleteDryRecord(@RequestBody String json);

    @DeleteMapping("user/records/wet/delete")
    ResponseEntity<Integer> deleteWetRecord(@RequestBody String json);

    @GetMapping("user/records/times")
    String getTimesByTrack(@RequestParam("username") String username, @RequestParam("track") String track, @RequestParam String type);

    @GetMapping("user/records/tracks")
    List<String> getUsersTrack(@RequestParam("username") String username,
                               @RequestParam("type")String type);

    @GetMapping("/track/cars")
    String getCarsByTrack(@RequestParam("username") String username, @RequestParam("track") String track, @RequestParam("type") String type);
}
