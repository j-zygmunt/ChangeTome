package com.changeTome.changeTome.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.changeTome.changeTome.domain.User;
import com.changeTome.changeTome.security.util.ITokenProvider;
import com.changeTome.changeTome.services.UserService;
import com.changeTome.changeTome.utils.TokenType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("api")
public class UserController {

    private final UserService userService;
    private final ITokenProvider<User> tokenProvider;

    @Autowired
    public UserController(
            UserService userService,
            ITokenProvider<User> tokenProvider
    ) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }

    @GetMapping("/user/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/user/add")
    public ResponseEntity<User> registerNewUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/users/add").toUriString());
        return ResponseEntity.created(uri).body(userService.addNewUser(user));
    }

    @DeleteMapping(path = "/user/get/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/refreshToken")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        var authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                var refreshToken = authorizationHeader.substring("Bearer ".length());
                var algorithm = Algorithm.HMAC256("secret".getBytes(UTF_8));
                var tokenVerifier = JWT.require(algorithm).build();
                var decodedJWT = tokenVerifier.verify(refreshToken);
                var emailAddress = decodedJWT.getSubject();
                var user = userService.getUserByEmailAddress(emailAddress);
                Map<String, String> tokens = new HashMap<>();
                tokens.put(
                        TokenType.ACCESS_TOKEN.tokenName(),
                        tokenProvider.createToken(user, String.valueOf(request.getRequestURL()), TokenType.ACCESS_TOKEN));
                tokens.put(TokenType.REFRESH_TOKEN.tokenName(), refreshToken);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception e) {
                response.setHeader("error", e.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", e.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}
