package com.synclab.recelog_b.service;

import com.synclab.recelog_b.entity.Track;
import com.synclab.recelog_b.exception.TrackException;
import com.synclab.recelog_b.repository.TrackRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrackService {
    @Autowired
    TrackRepo   trackRepo;
    private static final Logger logger = LoggerFactory.getLogger(TrackService.class);
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

    public void deleteTrack(String name, boolean isLogical) throws TrackException {
        //Se cancellazione logiva
        if(isLogical){
            if(!isTrackExist(name))
                throw new TrackException("La pista non esiste");
            else
                trackRepo.logicalDelete(name);
        }else //se cancellazione effettiva
            trackRepo.deleteByName(name);

    }

    public void insertNewTrack(Track track){

        if(!isTrackExistButDeleted(track.getName()))
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
    public boolean isTrackExistButDeleted(String name){
        Track t = trackRepo.findByName(name);
        return t != null;
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

    public List<String> getDeletedTracksName(){
        logger.info("Called getDeletedTracksName");
            return  trackRepo.findDeleted();

    }

    public void restoreTrack(String name) throws TrackException {
        if(!isTrackExistButDeleted(name))
            throw new TrackException("La pista non ha eliminazione logica");
        else
            trackRepo.restore(name);
    }





}
