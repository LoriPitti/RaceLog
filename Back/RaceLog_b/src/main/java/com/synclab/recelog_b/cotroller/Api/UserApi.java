package com.synclab.recelog_b.cotroller.Api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public interface UserApi {

    @GetMapping("/users")
    String getAllUsers();

    @GetMapping("/user")
    String getUserData(@RequestParam("username")String username);

    @GetMapping("/usernames")
    String geAllUsernames();

    @PostMapping("/user/login")
    String logIn(@RequestBody String json);

    @PostMapping("user/signup")
    String signUp(@RequestBody String json);

    @DeleteMapping("user/delete")
    ResponseEntity<Integer> deleteUser(@RequestParam("username") String username);

    @PostMapping("/user/update")
    ResponseEntity<Integer> updateUser(@RequestParam("username")String username,
                                              @RequestParam("name")String name,
                                              @RequestParam("lastname")String lastname,
                                              @RequestParam("email")String email,
                                              @RequestParam("password") String password);
}
