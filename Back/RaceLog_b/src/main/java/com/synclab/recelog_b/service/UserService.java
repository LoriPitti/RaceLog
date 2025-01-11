package com.synclab.recelog_b.service;

import com.synclab.recelog_b.service.security.JwtTokenService;
import com.synclab.recelog_b.cotroller.UserData;
import com.synclab.recelog_b.entity.User;
import com.synclab.recelog_b.exception.UserException;
import com.synclab.recelog_b.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepo  userRepo;
    @Autowired
    JwtTokenService jwtTokenService;

    private BCryptPasswordEncoder passwordEncoder =   new BCryptPasswordEncoder();
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    /**
     * login effettuato con  confronto di psw tramite BCryptPasswordEncoder
     * @param username
     * @param password
     * @return
     * @throws UserException
     */
    public User login(String username, String password) throws UserException {
        logger.info("Attempt to login with username: {}, password: {}", username, password);
        User user = userRepo.findByUsername(username);
        if(user==null)
            throw new UserException("noFound");
        else if(passwordEncoder.matches(password, user.getPassword())){
            user.setPassword("");
            user.setToken(jwtTokenService.generateToken(username,  user.getUserType()));
            return user;
        }
        else
            throw new UserException("pswWrong");
    }

    public boolean isUsernameExists(String username) {
        return userRepo.existsByUsername(username);
    }

    /**
     *Metodo di Registrazione Utente*
     * @param user (Istanza di User)
     * @return
     */
    public boolean signUpUser(User user){
        try{
            userRepo.save(encodePassword(user));
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
        users = users.stream().filter(user -> user.getUserType() == 0).toList();
        return users.stream().map(user -> new UserData(user.getUsername(), user.getName(), user.getLastname(), user.getIconType()))
                .collect(Collectors.toList());
    }

    public List<String> getAllUsernames(){
        return userRepo.getAllUsernames();
    }

    public User getUserData(String username){
        User user=  userRepo.findByUsername(username);
        user.setPassword("");
        return user;
    }

    @Transactional
    public boolean updateUser(String username, String name, String lastname, String email,String password) throws UserException{
        if(!isUsernameExists(username))
            throw new UserException("User not exist");
        userRepo.updateUser(name, lastname, email, passwordEncoder.encode(password), username);
        return true;
    }

    /**
     * Metodo per hashare psw con  Spring Security (BCryptPasswordEncoder)
     * @param u (istanza di Utser)
     * @return
     */
    private User encodePassword(User u){
        String psw = u.getPassword();
        u.setPassword(passwordEncoder.encode(psw));
        return  u;
    }



}
