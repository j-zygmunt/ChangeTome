package com.changeTome.changeTome.services;

import com.changeTome.changeTome.domain.Ad;
import com.changeTome.changeTome.domain.Photo;
import com.changeTome.changeTome.repositories.AdRepository;
import com.changeTome.changeTome.repositories.PhotoRepository;
import com.changeTome.changeTome.utils.PhotoUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class AdService {

    private final AdRepository adRepository;
    private final PhotoRepository photoRepository;

    @Autowired
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

    public void postAd(
            Ad ad,
            List<MultipartFile> multipartFiles
    ) {
        for (MultipartFile file : multipartFiles) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Photo photo = new Photo(fileName, ad);
            photoRepository.save(photo);
            PhotoUploadUtil.savePhoto(fileName, file);
        }
    }
}
