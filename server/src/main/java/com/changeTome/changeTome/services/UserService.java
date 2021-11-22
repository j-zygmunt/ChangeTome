package com.changeTome.changeTome.services;

import com.changeTome.changeTome.domain.User;
import com.changeTome.changeTome.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserByEmailAddress(String emailAddress) {
        var optionalUser = userRepository.findUserByEmailAddress(emailAddress);
        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("User with this emailAddress does not exists");
        }
        return optionalUser.get();
    }

    public User addNewUser(User user) {
        var optionalUser = userRepository
                .findUserByEmailAddressOrPhoneNumber(user.getEmailAddress(), user.getPhoneNumber());
        if (optionalUser.isPresent()) {
            throw new IllegalArgumentException("User with this email/phone number already exists");
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        } else {
            throw new IllegalStateException("User with id " + userId + "doesn't exists");
        }
    }

    public void setUserActivenessByEmail(
            String emailAddress,
            boolean isActive
    ) {
        var optionalUser = userRepository.findUserByEmailAddress(emailAddress);
        if (optionalUser.isPresent()) {
            optionalUser.get().setActive(isActive);
            userRepository.save(optionalUser.get());
        } else {
            throw new IllegalArgumentException("User with email " + emailAddress + "doesn't exists");
        }
    }
}
