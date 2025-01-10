package com.synclab.recelog_b.service;

import com.synclab.recelog_b.entity.Track;
import com.synclab.recelog_b.exception.TrackException;
import com.synclab.recelog_b.repository.TrackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrackService {
    @Autowired
    TrackRepo   trackRepo;
    public List<Track> getAllTracks(){
        return trackRepo.findAll();
    }

    public List<String> getAllTracksName(){return trackRepo.getAllTracksName();};

    public Track getTrackByName(String name) throws TrackException {
        if(!isTrackExist(name))
            throw  new TrackException("La pista non esiste");
        return  trackRepo.findByName(name);

    }

    public Integer deleteTrack(String name) throws TrackException {
        if(!isTrackExist(name))
            throw new TrackException("La pista non  esiste");
        else
            return trackRepo.deleteTrackByName(name);
    }

    public void insertNewTrack(Track track){
        trackRepo.save(track);
    }
    public boolean isTrackExist(String name){
        return trackRepo.existsByName(name);

    }





}
