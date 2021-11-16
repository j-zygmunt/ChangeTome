package com.changeTome.changeTome.controllers;

import com.changeTome.changeTome.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/login")
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

//    @PostMapping
//    public void login(@RequestBody LoginCredentials credentials) {
//    }
}
