package com.synclab.recelog_b.cotroller.Api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public interface AdminApi {

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/track/load")
    ResponseEntity<Integer> insertNewTrack(
            @RequestParam("name") String name,
            @RequestParam("country") String country,
            @RequestParam("imgBack") MultipartFile imgBack,
            @RequestParam("imgFront") MultipartFile imgFront,
            @RequestParam("length") int length,
            @RequestParam("cornerL") int cornerL,
            @RequestParam("cornerR") int cornerR
    );

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/car/load")
    ResponseEntity<Integer> insertNewCar(
            @RequestParam("name") String name,
            @RequestParam("brand") String brand,
            @RequestParam("imgBack") MultipartFile imgBack,
            @RequestParam("imgFront") MultipartFile imgFront,
            @RequestParam("year") int year
    );

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/car/delete")
    ResponseEntity<Integer> deleteCar(
            @RequestParam("name")  String name);

}
