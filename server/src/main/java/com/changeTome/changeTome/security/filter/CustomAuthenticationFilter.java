package com.changeTome.changeTome.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.changeTome.changeTome.security.util.ITokenProvider;
import com.changeTome.changeTome.utils.TokenType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private static final Logger LOG = LoggerFactory.getLogger(CustomAuthenticationFilter.class);
    private final AuthenticationManager authenticationManager;
    private final ITokenProvider<User> tokenProvider;

    public CustomAuthenticationFilter(
            AuthenticationManager authenticationManager,
            ITokenProvider<User> tokenProvider
            ) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws AuthenticationException {

        var emailAddress = request.getParameter("username");
        var password = request.getParameter("password");
        LOG.info("Email is: " + emailAddress + " Password is: " + password);
        var authenticationToken = new UsernamePasswordAuthenticationToken(emailAddress, password);

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authentication
    ) throws IOException {

        var user = (User) authentication.getPrincipal();

//        response.setHeader(
//                TokenType.ACCESS_TOKEN.tokenName(),
//                createTokenForUser(user, String.valueOf(request.getRequestURL()), TokenType.ACCESS_TOKEN));
//        response.setHeader(
//                TokenType.REFRESH_TOKEN.tokenName(),
//                createTokenForUser(user, String.valueOf(request.getRequestURL()), TokenType.REFRESH_TOKEN));
        Map<String, String> tokens = new HashMap<>();
        tokens.put(
                TokenType.ACCESS_TOKEN.tokenName(),
                tokenProvider.createToken(user, String.valueOf(request.getRequestURL()), TokenType.ACCESS_TOKEN));
        tokens.put(
                TokenType.REFRESH_TOKEN.tokenName(),
                tokenProvider.createToken(user, String.valueOf(request.getRequestURL()), TokenType.REFRESH_TOKEN));
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }
}
