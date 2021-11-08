package com.changeTome.changeTome.configurations;

import com.changeTome.changeTome.po.User;
import com.changeTome.changeTome.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return args -> {
            User user = new User(
                    "Mariusz",
                    "Pudzian",
                    "007",
                    "pudzian@wp.pl",
                    "123"
            );

            userRepository.saveAll(List.of(user));
        };
    }
}
