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
    @Autowired
    private TrackService trackService;
    @Autowired
    private CarService carService;


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
        List<Dry_record> list =new ArrayList<>();
        List<Dry_record> finalList =new ArrayList<>();
        if(userService.isUsernameExists(username)){
            list = dryRepo.findAllByUsername(username);
            for(Dry_record record : list){
                if(trackService.isTrackExist(record.getTrack()))
                    finalList.add(record);
            }
            return finalList;
        }else
            throw  new UserException("user not exist");
    }
    public List<Wet_record> getUserWetRecord(String  username) throws UserException {
        List<Wet_record> list =new ArrayList<>();
        List<Wet_record> finalList =new ArrayList<>();
        if(userService.isUsernameExists(username)){
            list =  wetRepo.findAllByUsername(username);
            list = wetRepo.findAllByUsername(username);
            for(Wet_record record : list){
                if(trackService.isTrackExist(record.getTrack()))
                    finalList.add(record);
            }
            return finalList;
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
        if(!trackService.isTrackExist(track))
            return null;
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
        List<String> cars = null;
        if(type.equals("dry"))
            cars =  dryRepo.getCarsByTrack(username, track);
        else
            cars=  wetRepo.getCarsByTrack(username, track);
        List<String> finaList = new ArrayList<>();
        for(String t : cars){
            if(carService.isCarExist(t)) //restituisco solo  se esiste
                finaList.add(t);
        }
        return finaList;
    }

    public List<String> getTracksForUser(String username, String type){
        List<String> userTrack = null;

        if(type.equals("dry")){
            userTrack=  this.dryRepo.getTrackForUser(username);

        }else{
            userTrack= this.wetRepo.getTrackForUser(username);
        }

        List<String> finaList = new ArrayList<>();
        for(String t : userTrack){
            if(trackService.isTrackExist(t)) //restituisco solo  se esiste
                finaList.add(t);
        }
        return finaList;
    }


}
