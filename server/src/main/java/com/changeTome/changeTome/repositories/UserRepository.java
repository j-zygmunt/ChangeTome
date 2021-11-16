package com.changeTome.changeTome.repositories;

import com.changeTome.changeTome.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserById(Long id);

    Optional<User> findUserByEmailAddress(String emailAddress);

    Optional<User> findUserByEmailAddressOrPhoneNumber(String emailAddress, String phoneNumber);
}
