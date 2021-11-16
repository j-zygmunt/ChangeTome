package com.changeTome.changeTome.utils;

public enum TokenType {
    ACCESS_TOKEN("access_token", 600000),
    REFRESH_TOKEN("refresh_token", 1800000);

    private final String tokenName;
    private final int expirationTime;

    TokenType(
            String tokenName,
            int expirationTime
    ) {
        this.tokenName = tokenName;
        this.expirationTime = expirationTime;
    }

    public String tokenName() {
        return tokenName;
    }

    public int expirationTime() {
        return expirationTime;
    }
}
