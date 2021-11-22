package com.changeTome.changeTome.security.filter;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private static final Logger LOG = LoggerFactory.getLogger(CustomAuthenticationFilter.class);
    private final AuthenticationManager authenticationManager;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws AuthenticationException {

        var jsonBuffer = new StringBuffer();
        try {
            var reader = request.getReader();
            String line = null;
            while ((line = reader.readLine()) != null) {
                jsonBuffer.append(line);
            }
        } catch (IOException e) {
            LOG.error("Error while parsing request");
            e.printStackTrace();
        }

        var jsonObject = new JSONObject(jsonBuffer.toString());
        var password = jsonObject.getString("password");
        var emailAddress = jsonObject.getString("username");
        var authenticationToken = new UsernamePasswordAuthenticationToken(emailAddress, password);

        return authenticationManager.authenticate(authenticationToken);
    }
}
