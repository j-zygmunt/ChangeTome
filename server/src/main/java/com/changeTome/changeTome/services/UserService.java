package com.changeTome.changeTome.services;

import com.changeTome.changeTome.domain.User;
import com.changeTome.changeTome.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String emailAddress) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findUserByEmailAddress(emailAddress);
        if (user.isEmpty()) {
            LOGGER.error("User not found");
            throw new UsernameNotFoundException("User not found");
        } else {
            LOGGER.info("User found: {}", emailAddress);
        }
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(String.valueOf(user.get().getRole()));

        return new org.springframework.security.core.userdetails.User(
                user.get().getEmailAddress(),
                user.get().getPassword(),
                List.of(authority)
        );
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserByEmailAddress(String emailAddress) {
        var optionalUser = userRepository.findUserByEmailAddress(emailAddress);
        if (optionalUser.isPresent()) {
            throw new IllegalArgumentException("User with this emailAddress does not exists");
        }
        return optionalUser.get();
    }

    public User addNewUser(User user) {
        Optional<User> optionalUser = userRepository
                .findUserByEmailAddressOrPhoneNumber(user.getEmailAddress(), user.getPhoneNumber());
        if (optionalUser.isPresent()) {
            throw new IllegalArgumentException("User with this email/phone number already exists");
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        if(userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        } else {
            throw new IllegalStateException("User with id " + userId + "doesn't exists");
        }
    }
}
