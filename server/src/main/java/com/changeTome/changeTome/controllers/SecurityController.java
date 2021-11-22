package com.changeTome.changeTome.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.changeTome.changeTome.domain.User;
import com.changeTome.changeTome.security.util.ITokenProvider;
import com.changeTome.changeTome.services.UserService;
import com.changeTome.changeTome.utils.TokenType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("api")
public class SecurityController {

    private final UserService userService;
    private final ITokenProvider<User> tokenProvider;

    public SecurityController(
            UserService userService,
            ITokenProvider<User> tokenProvider
    ) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }

    @GetMapping(path = "/refreshToken")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {

        var cookie = WebUtils.getCookie(request, TokenType.REFRESH_TOKEN.tokenName());
        if (cookie != null) {
            try {
                var refreshToken = cookie.getValue();
                var algorithm = Algorithm.HMAC256("secret".getBytes(UTF_8));
                var tokenVerifier = JWT.require(algorithm).build();
                var decodedJWT = tokenVerifier.verify(refreshToken);
                var emailAddress = decodedJWT.getSubject();
                var user = userService.getUserByEmailAddress(emailAddress);
                var accessToken = tokenProvider.createToken(user, String.valueOf(request.getRequestURL()), TokenType.ACCESS_TOKEN);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), Map.of(TokenType.ACCESS_TOKEN.tokenName(), accessToken));
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
