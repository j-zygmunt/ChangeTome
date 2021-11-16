package com.changeTome.changeTome.repositories;

import com.changeTome.changeTome.domain.Ad;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdRepository extends JpaRepository<Ad, Long> {

    @Query("select a from Ad a")
    List<Ad> findAllAds(Pageable pageable);

    @Query("select a from Ad a order by a.createdAt desc ")
    List<Ad> findLatestAds(Pageable pageable);
}
