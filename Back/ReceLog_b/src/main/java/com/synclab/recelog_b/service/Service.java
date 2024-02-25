package com.synclab.recelog_b.service;

import com.synclab.recelog_b.exception.UserException;
import com.synclab.recelog_b.repository.UserRepo;
import com.synclab.recelog_b.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
@org.springframework.stereotype.Service
public class Service {
    @Autowired
    UserRepo userRepo;

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
            System.out.println("Save user: "+ ex.getMessage());
            return false;
        }
    }

    public boolean deleteByusername(String username, String password) throws UserException {
       User user =  login(username, password);
       userRepo.deleteById(user.getId());
       return true;


    }
}
