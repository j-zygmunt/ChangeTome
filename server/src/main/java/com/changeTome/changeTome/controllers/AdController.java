package com.changeTome.changeTome.controllers;

import com.changeTome.changeTome.domain.Ad;
import com.changeTome.changeTome.domain.Photo;
import com.changeTome.changeTome.services.AdService;
import com.changeTome.changeTome.services.UserService;
import com.changeTome.changeTome.to.AdTo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("api/ads")
public class AdController {

    private static final Logger LOG = LoggerFactory.getLogger(AdController.class);
    private final AdService adService;
    private final UserService userService;

    public AdController(
            AdService adService,
            UserService userService
    ) {
        this.adService = adService;
        this.userService = userService;
    }

    @GetMapping
    public List<Ad> getAds(int page) {
        return adService.getAds(page);
    }

    @PostMapping(path = "/private/postAd")
    public ResponseEntity postAd(
            @RequestPart("images") MultipartFile[] files,
            @RequestPart("ad") AdTo adTo
    ) {
        List<Photo> photos;
        var user = userService.getUserByEmailAddress(adTo.getCreatorEmailAddress());
        var ad = new Ad(
                adTo.getAuthor(),
                adTo.getTitle(),
                adTo.getDescription(),
                adTo.getPrice(),
                adTo.getCondition());
        var uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/ads/private/postAd").toUriString());
        return ResponseEntity.created(uri).body(adService.postAd(user, ad, Arrays.asList(files)));
    }

    @GetMapping(path = "/getLatestAds")
    public List<Ad> getLatestAds() {
        return adService.getLatestAds();
    }
}
