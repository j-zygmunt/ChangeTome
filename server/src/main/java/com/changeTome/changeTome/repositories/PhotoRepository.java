package com.changeTome.changeTome.repositories;

import com.changeTome.changeTome.domain.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
}
