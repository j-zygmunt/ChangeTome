package com.changeTome.changeTome.security.hadlers;

import com.changeTome.changeTome.security.util.ITokenProvider;
import com.changeTome.changeTome.services.UserService;
import com.changeTome.changeTome.utils.TokenType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class SuccessfulAuthenticationHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final ITokenProvider<User> tokenProvider;
    private final UserService userService;

    public SuccessfulAuthenticationHandler(
            ITokenProvider<User> tokenProvider,
            UserService userService
    ) {
        this.tokenProvider = tokenProvider;
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        var user = (User) authentication.getPrincipal();
        userService.setUserActivenessByEmail(user.getUsername(), true);
        var accessToken = tokenProvider.createToken(user, String.valueOf(request.getRequestURL()), TokenType.ACCESS_TOKEN);
        var refreshToken = tokenProvider.createToken(user, String.valueOf(request.getRequestURL()), TokenType.REFRESH_TOKEN);

        var refreshTokenCookie = new Cookie(TokenType.REFRESH_TOKEN.tokenName(), refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setMaxAge(365 * 24 * 60 * 60);
        refreshTokenCookie.setSecure(false); //true only allows HTTPS
//        refreshTokenCookie.setDomain("/");
        refreshTokenCookie.setPath("/");

        response.addCookie(refreshTokenCookie);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), Map.of(TokenType.ACCESS_TOKEN.tokenName(), accessToken));
    }

}
