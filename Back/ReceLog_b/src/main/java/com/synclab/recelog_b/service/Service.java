package com.synclab.recelog_b.service;

import com.synclab.recelog_b.cotroller.UserData;
import com.synclab.recelog_b.entity.*;
import com.synclab.recelog_b.exception.RecordException;
import com.synclab.recelog_b.exception.TrackException;
import com.synclab.recelog_b.exception.UserException;
import com.synclab.recelog_b.repository.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class Service {
    @Autowired
    UserRepo userRepo;
    @Autowired
    TrackRepo trackRepo;
    @Autowired
    CarRepo carRepo;
    @Autowired
    WetRepo wetRepo;
    @Autowired
    DryRepo dryRepo;


    //-----------------------------USER SECTION----------------------------------------
    public User login(String username, String password) throws UserException {
       User user = userRepo.findByUsername(username);
       if(user==null)
           throw new UserException("noFound");
       else if(user.getPassword().equals(password))
           return  user;
       else
           throw new UserException("pswWrong");
    }
    public boolean isUsernameExists(String username) {
        return userRepo.existsByUsername(username);
    }

    public boolean signUpUser(User user){
        try{
            userRepo.save(user);
            return true;
        }catch (Exception ex){
            return false;
        }
    }

    public boolean deleteByusername(String username, String password) throws UserException {
       User user =  login(username, password);
       userRepo.deleteById(user.getId());
       return true;


    }

    public List<UserData> getAllUsers(){
        List<User> users = userRepo.findAll();
         return users.stream().map(user -> new UserData(user.getUsername(), user.getName(), user.getLastname(), user.getIconType()))
                 .collect(Collectors.toList());
    }

    public List<String> getAllUsernames(){
        return userRepo.getAllUsernames();
    }
    //----------------------------------UER RECORD SECTION--------------------------------------------------------
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
        if(isUsernameExists(username)){
                return dryRepo.findAllByUsername(username);
        }else
            throw  new UserException("user not exist");
    }
    public List<Wet_record> getUserWetRecord(String  username) throws UserException {
        if(isUsernameExists(username)){
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

    //---------------------------------ADMIN SECTION----------------------------------------------------------
    public void insertNewTrack(Track track){
            trackRepo.save(track);
    }
    public void insertNewCar(Car car){
        carRepo.save(car);
    }

    public boolean isTrackExist(String name){
        return trackRepo.existsByName(name);

    }

    //-----------------------------TRACK SECTION---------------------------------------------
    public List<Track> getAllTracks(){
        return trackRepo.findAll();
    }

    public List<String> getAllTracksName(){return trackRepo.getAllTracksName();};

    public Track getTrackByName(String name) throws TrackException {
        if(!isTrackExist(name))
            throw  new TrackException("La pista non esiste");
        return  trackRepo.findByName(name);

    }
    //------------------------------CAR SECTION----------------------------------------------------
    public List<String> getAllCarsName(){return carRepo.getAllCarsName();};
    public List<Car> getAllCars(){
        return carRepo.findAll();
    }

}
