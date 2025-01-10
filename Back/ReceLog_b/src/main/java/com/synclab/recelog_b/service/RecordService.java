package com.synclab.recelog_b.service;

import com.synclab.recelog_b.cotroller.CarTimes;
import com.synclab.recelog_b.entity.Dry_record;
import com.synclab.recelog_b.entity.Wet_record;
import com.synclab.recelog_b.exception.RecordException;
import com.synclab.recelog_b.exception.UserException;
import com.synclab.recelog_b.repository.DryRepo;
import com.synclab.recelog_b.repository.WetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecordService {
    @Autowired
    WetRepo wetRepo;
    @Autowired
    DryRepo dryRepo;
    @Autowired
    UserService userService;


    public void insertNewDryRecord(Dry_record record) throws Exception {
        if(dryRepo.findRecord(record.getUsername(), record.getTrack(), record.getCar(), record.getTime()) != null)
            throw new Exception("alreadyInsert");
        dryRepo.save(record);
    }
    public void insertNewWetRecord(Wet_record record) throws Exception {
        if(wetRepo.findRecord(record.getUsername(), record.getTrack(), record.getCar(), record.getTime()) != null)
            throw new Exception("alreadyInsert");
        wetRepo.save(record);}
    public List<Dry_record> getUserDryRecord(String  username) throws UserException {
        List<String> list =new ArrayList<>();
        if(userService.isUsernameExists(username)){
            return dryRepo.findAllByUsername(username);
        }else
            throw  new UserException("user not exist");
    }
    public List<Wet_record> getUserWetRecord(String  username) throws UserException {
        if(userService.isUsernameExists(username)){
            return wetRepo.findAllByUsername(username);
        }else
            throw  new UserException("user not exist");
    }

    public void deleteRecord(String username, String track, String car, String time, String type) throws RecordException {
        if(type.equals("dry")) {
            Integer id = dryRepo.selectId(username, track, car, time);
            if (id == null)
                throw new RecordException("Dry track not exist");
            else
                dryRepo.deleteById(id);
            System.out.println("delete");
        }
        else if(type.equals("wet")){
            System.out.println("wer");
            Integer id = wetRepo.selectId(username, track, car, time);
            if (id == null)
                throw new RecordException("Wet track not exist");
            else
                wetRepo.deleteById(id);
            System.out.println("delete");
        }
    }

    public List<CarTimes> getTimesByTrack(String username, String track, String type){
        List<String> times = new ArrayList<>();
        if(type.equals("dry"))
            times= dryRepo.getTimesFromTrack(username,track);
        else
            times  = wetRepo.getTimesFromTrack(username,track);
        //convert into a CarTimes obj
        List<CarTimes> carTimes = new ArrayList<>();
        for (String element : times) {
            String[] parts = element.split(",");
            carTimes.add(new CarTimes(parts[0], parts[1]));
        }
        return carTimes;
    }

    public List<String> getCarsByTrack(String username, String track, String type){
        if(type.equals("dry"))
            return dryRepo.getCarsByTrack(username, track);
        else
            return wetRepo.getCarsByTrack(username, track);
    }

    public List<String> getTracksForUser(String username, String type){
        if(type.equals("dry")){
            return this.dryRepo.getTrackForUser(username);
        }else{
            return this.wetRepo.getTrackForUser(username);
        }
    }


}
