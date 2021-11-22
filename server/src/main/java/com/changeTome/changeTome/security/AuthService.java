package com.changeTome.changeTome.security;

import com.changeTome.changeTome.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService implements UserDetailsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthService.class);
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String emailAddress) throws UsernameNotFoundException {
        var user = userRepository.findUserByEmailAddress(emailAddress);
        if (user.isEmpty()) {
            LOGGER.error("User not found");
            throw new UsernameNotFoundException("User not found");
        } else {
            LOGGER.info("User found: {}", emailAddress);
        }
        var authority = new SimpleGrantedAuthority(String.valueOf(user.get().getRole()));

        return new org.springframework.security.core.userdetails.User(
                user.get().getEmailAddress(),
                user.get().getPassword(),
                List.of(authority)
        );
    }
}
