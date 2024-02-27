package com.synclab.recelog_b.service;

import com.synclab.recelog_b.cotroller.UserData;
import com.synclab.recelog_b.entity.Image;
import com.synclab.recelog_b.entity.Track;
import com.synclab.recelog_b.exception.UserException;
import com.synclab.recelog_b.repository.TrackRepo;
import com.synclab.recelog_b.repository.UserRepo;
import com.synclab.recelog_b.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class Service {
    @Autowired
    UserRepo userRepo;
    @Autowired
    TrackRepo trackRepo;

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


    //---------------------------------ADMIN SECTION----------------------------------------------------------
    public boolean insertNewTrack(Track track){
            trackRepo.save(track);
            return true;
    }

    public boolean isTrackExist(String name){
        return trackRepo.existsByName(name);

    }

    public List<Track> getAllTracks(){
        return trackRepo.findAll();
    }

    public List<String> getAllTracksName(){return trackRepo.getAllTracksName();};


}
