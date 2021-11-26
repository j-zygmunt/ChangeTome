package com.changeTome.changeTome.services;

import com.changeTome.changeTome.domain.Ad;
import com.changeTome.changeTome.domain.Photo;
import com.changeTome.changeTome.domain.User;
import com.changeTome.changeTome.repositories.AdRepository;
import com.changeTome.changeTome.repositories.PhotoRepository;
import com.changeTome.changeTome.utils.PhotoUploadUtil;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AdService {

    private final AdRepository adRepository;
    private final PhotoRepository photoRepository;

    public AdService(
            AdRepository adRepository,
            PhotoRepository photoRepository
    ) {
        this.adRepository = adRepository;
        this.photoRepository = photoRepository;
    }

    public List<Ad> getAds(int page) {
        return adRepository.findAllAds(PageRequest.of(page,10));
    }

    public List<Ad> getLatestAds() {
        return adRepository.findLatestAds(PageRequest.of(0,6));
    }


    public Ad postAd(
            User user,
            Ad ad,
            List<MultipartFile> multipartFiles
    ) {
        Set<Photo> photos = new HashSet<>();
        for (var file : multipartFiles) {
            var fileName = PhotoUploadUtil.savePhoto(file, String.valueOf(user.getId()));
            photos.add(new Photo(fileName, ad));
        }
        ad.setUser(user);
        ad.setPhotos(photos);
        return adRepository.save(ad);
    }
}
