package com.synclab.recelog_b.service;

import com.synclab.recelog_b.cotroller.CarTimes;
import com.synclab.recelog_b.cotroller.UserData;
import com.synclab.recelog_b.entity.*;
import com.synclab.recelog_b.exception.RecordException;
import com.synclab.recelog_b.exception.TrackException;
import com.synclab.recelog_b.exception.UserException;
import com.synclab.recelog_b.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
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

    public void deleteByUsername(String username) throws UserException {
        if(!isUsernameExists(username))
            throw new UserException("not exist");
        userRepo.deleteById(userRepo.getUserIdByUsername(username));
    }

    public List<UserData> getAllUsers(){
        List<User> users = userRepo.findAll();
         return users.stream().map(user -> new UserData(user.getUsername(), user.getName(), user.getLastname(), user.getIconType()))
                 .collect(Collectors.toList());
    }

    public List<String> getAllUsernames(){
        return userRepo.getAllUsernames();
    }

    public User getUserData(String username){return userRepo.findByUsername(username);}

    @Transactional
    public boolean updateUser(String username, String name, String lastname, String email,String password) throws UserException{
        if(!isUsernameExists(username))
            throw new UserException("User not exist");
        userRepo.updateUser(name, lastname, email, password, username);
        return true;
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
        List<String> list =new ArrayList<>();
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

    public List<String> getCarsByTrack(String username, String track, String type){
        if(type.equals("dry"))
            return dryRepo.getCarsByTrack(username, track);
        else
            return wetRepo.getCarsByTrack(username, track);
    }
    //------------------------------CAR SECTION----------------------------------------------------
    public List<String> getAllCarsName(){return carRepo.getAllCarsName();};
    public List<Car> getAllCars(){
        return carRepo.findAll();
    }

    public Car getCarByName(String name) throws TrackException {
        if(!isCarExist(name))
            throw  new TrackException("La vettura non esiste");
        return  carRepo.findByName(name);
    }
    public boolean isCarExist(String name){
        return carRepo.existsByName(name);

    }

}
