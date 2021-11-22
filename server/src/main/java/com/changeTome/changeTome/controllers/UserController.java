package com.changeTome.changeTome.controllers;

import com.changeTome.changeTome.domain.User;
import com.changeTome.changeTome.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/add")
    public ResponseEntity<User> registerNewUser(@RequestBody @Valid User user) {
        var uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/users/add").toUriString());
        return ResponseEntity.created(uri).body(userService.addNewUser(user));
    }

    @DeleteMapping(path = "/get/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }
}
