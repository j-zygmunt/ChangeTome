package com.changeTome.changeTome.security.util;

import com.changeTome.changeTome.utils.TokenType;

public interface ITokenProvider<T> {
    String createToken(T subject, String issuer, TokenType tokenType);
}
