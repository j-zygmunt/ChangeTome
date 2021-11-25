package com.changeTome.changeTome.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "Ad")
@Table(name = "ads")
public class Ad {

    @Id
    @SequenceGenerator(name = "ad_seq", sequenceName = "ad_seq", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "ad_seq")
    @Column(name = "id", updatable = false)
    private Long id;

    @NotBlank
    @Column(name = "author", columnDefinition = "TEXT")
    private String author;

    @NotBlank
    @Column(name = "title", columnDefinition = "TEXT")
    private String title;

    @NotNull
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull
    @Column(name = "price")
    private BigDecimal price;

    @NotNull
    @Column(name = "condition")
    private Float condition;

    @NotNull
    @Column(name = "created_at")
    private Timestamp createdAt;

    @NotNull
    @Column(name = "views_amount")
    private Long viewsAmount;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "ad", cascade = CascadeType.ALL)
    private Set<Photo> photos = new HashSet<>();

    @OneToMany(mappedBy = "ad", cascade = CascadeType.ALL)
    private Set<Message> messages = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_review", referencedColumnName = "id")
    private Review review;

    @OneToMany(mappedBy = "ad", cascade = CascadeType.ALL)
    private Set<StarredAd> stars = new HashSet<>();

    public Ad() {
        //
    }

    public Ad(
            String author,
            String title,
            String description,
            BigDecimal price,
            Float condition
    ) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.price = price;
        this.condition = condition;
    }

    @PrePersist
    public void prePersist() {
        createdAt = new Timestamp(System.currentTimeMillis());
        viewsAmount = 0L;
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

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Long getViewsAmount() {
        return viewsAmount;
    }

    public void setViewsAmount(Long viewsAmount) {
        this.viewsAmount = viewsAmount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public void addPhotos(Photo ...photos) {
        this.photos.addAll(Arrays.asList(photos));
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public Set<StarredAd> getStars() {
        return stars;
    }

    public void setStars(Set<StarredAd> stars) {
        this.stars = stars;
    }

    @Override
    public String toString() {
        return "Ad{" +
                "id=" + id +
                ", author='" + author + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", condition=" + condition +
                ", createdAt=" + createdAt +
                ", viewsAmount=" + viewsAmount +
                ", user=" + user +
                ", photos=" + photos +
                ", messages=" + messages +
                ", review=" + review +
                ", stars=" + stars +
                '}';
    }
}
