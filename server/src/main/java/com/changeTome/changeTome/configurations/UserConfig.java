package com.changeTome.changeTome.configurations;

import com.changeTome.changeTome.domain.User;
import com.changeTome.changeTome.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return args -> {
            User user0 = new User(
                    "Mariusz",
                    "Pudzian",
                    "006",
                    "1@wp.pl",
                    new BCryptPasswordEncoder().encode("123")
            );
            User user1 = new User(
                    "Kamil",
                    "Pudzian",
                    "007",
                    "2@wp.pl",
                    new BCryptPasswordEncoder().encode("123")
            );
            User user2 = new User(
                    "Maciej",
                    "Pudzian",
                    "008",
                    "3@wp.pl",
                    new BCryptPasswordEncoder().encode("123")
            );
            User user3 = new User(
                    "Darek",
                    "Pudzian",
                    "009",
                    "4@wp.pl",
                    new BCryptPasswordEncoder().encode("123")
            );
            User user4 = new User(
                    "Koza",
                    "Pudzian",
                    "000",
                    "5@wp.pl",
                    new BCryptPasswordEncoder().encode("123")
            );

            userRepository.saveAll(List.of(user0, user1, user2, user3, user4));
        };
    }
}
