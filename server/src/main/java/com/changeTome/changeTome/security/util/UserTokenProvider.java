package com.changeTome.changeTome.security.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.changeTome.changeTome.domain.User;
import com.changeTome.changeTome.utils.TokenType;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@Service
public final class UserTokenProvider implements ITokenProvider<User> {

    @Override
    public String createToken(
            User user,
            String issuer,
            TokenType tokenType
    ) {

        var algorithm = Algorithm.HMAC256("secret".getBytes(StandardCharsets.UTF_8));
        var tokenBuilder = JWT.create();
        tokenBuilder.withSubject(user.getEmailAddress())
                .withExpiresAt(new Date(System.currentTimeMillis() + tokenType.expirationTime()))
                .withIssuer(issuer);
        if (tokenType == TokenType.ACCESS_TOKEN) {
            tokenBuilder.withClaim("roles", List.of(user.getRole()));
        }

        return tokenBuilder.sign(algorithm);
    }

}
