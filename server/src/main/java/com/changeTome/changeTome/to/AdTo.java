package com.changeTome.changeTome.to;

import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public class AdTo {

    private Long id;
    private String author;
    private String title;
    private String description;
    private BigDecimal price;
    private Float condition;
    private Long viewsAmount;
    private String creatorEmailAddress;
    private MultipartFile[] photos;

    public AdTo() {
        //
    }

    public AdTo(
            String title,
            String author,
            String description,
            BigDecimal price,
            Float condition,
            String creatorEmailAddress,
            MultipartFile[] photos
    ) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.price = price;
        this.condition = condition;
        this.creatorEmailAddress = creatorEmailAddress;
        this.photos = photos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Float getCondition() {
        return condition;
    }

    public void setCondition(Float condition) {
        this.condition = condition;
    }

    public Long getViewsAmount() {
        return viewsAmount;
    }

    public void setViewsAmount(Long viewsAmount) {
        this.viewsAmount = viewsAmount;
    }

    public String getCreatorEmailAddress() {
        return creatorEmailAddress;
    }

    public void setCreatorEmailAddress(String creatorEmailAddress) {
        this.creatorEmailAddress = creatorEmailAddress;
    }

    public MultipartFile[] getPhotos() {
        return photos;
    }

    public void setPhotos(MultipartFile[] photos) {
        this.photos = photos;
    }
}
