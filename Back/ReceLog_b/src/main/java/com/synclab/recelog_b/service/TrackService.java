package com.synclab.recelog_b.service;

import com.synclab.recelog_b.entity.Track;
import com.synclab.recelog_b.exception.TrackException;
import com.synclab.recelog_b.repository.TrackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrackService {
    @Autowired
    TrackRepo   trackRepo;
    public List<Track> getAllTracks(){
        List<Track> tracks  =  trackRepo.findAll();
        return new ArrayList<>(tracks.stream().filter(
                t -> isTrackExist(t.getName())).toList());
    }

    public List<String> getAllTracksName(){
        List<String> list = trackRepo.getAllTracksName();
        return new ArrayList<>(list.stream().filter(
                this::isTrackExist).toList());
    };

    public Track getTrackByName(String name) throws TrackException {
        if(!isTrackExist(name))
            throw  new TrackException("La pista non esiste");
        return  trackRepo.findByName(name);

    }

    public void deleteTrack(String name) throws TrackException {
        if(!isTrackExist(name))
            throw new TrackException("La pista non esiste");
        else
             trackRepo.logicalDelete(name);
    }

    public void insertNewTrack(Track track){

        if(!isTrackExist(track.getName()))
            trackRepo.save(track);
        else{
            Track t = trackRepo.findByName(track.getName());
            t.setCountry(track.getCountry());
            t.setImgBack(track.getImgBack());
            t.setImgFront(track.getImgFront());
            t.setLength(track.getLength());
            t.setCornerL(track.getCornerL());
            t.setCornerR(track.getCornerR());
            trackRepo.save(t);
        }
    }
    public boolean isTrackExist(String name){
        Track t = trackRepo.findByName(name);
        if(t==null)
            return false;
        else return !isDeleted(t);
    }

    private boolean isDeleted(Track t){
        return t.isDeleted();
    }





}
