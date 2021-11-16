package com.changeTome.changeTome.security.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.changeTome.changeTome.utils.TokenType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public final class UserDetailsTokenProvider implements ITokenProvider<User> {

    @Override
    public String createToken(
            User user,
            String issuer,
            TokenType tokenType
    ) {

        var algorithm = Algorithm.HMAC256("secret".getBytes(StandardCharsets.UTF_8));
        var tokenBuilder = JWT.create();
        tokenBuilder.withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + tokenType.expirationTime()))
                .withIssuer(issuer);
        if (tokenType == TokenType.ACCESS_TOKEN) {
            tokenBuilder.withClaim("roles", user.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList()));
        }

        return tokenBuilder.sign(algorithm);
    }

}
