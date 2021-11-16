package com.changeTome.changeTome.controllers;

import com.changeTome.changeTome.domain.Ad;
import com.changeTome.changeTome.services.AdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/ads")
public class AdController {

    private final AdService adService;

    @Autowired
    public AdController(AdService adService) {
        this.adService = adService;
    }

    @GetMapping
    public List<Ad> getAds(int page) {
        return adService.getAds(page);
    }

    public void postAd(Ad ad) {
    }

    @GetMapping(path = "/getLatestAds")
    public List<Ad> getLatestAds() {
        return adService.getLatestAds();
    }
}
