package com.synclab.recelog_b.cotroller.Api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

public interface TrackApi {

    @GetMapping("/tracks")
    String getAllTracks();

    @GetMapping("/tracksname")
    String getAllTracksName();

    @GetMapping("/track/{name}")
    String getTrackByName(@PathVariable String name);


}
