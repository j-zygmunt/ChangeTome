package com.changeTome.changeTome.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "Review")
@Table(name = "reviews")
public class Review {

    @Id
    @SequenceGenerator(name = "review_seq", sequenceName = "review_seq", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "review_seq")
    @Column(name = "id", updatable = false)
    private Long id;

    @NotBlank
    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @NotNull
    @Column(name = "rating")
    private Float rating;

    @NotNull
    @Column(name = "reviewed_at")
    private Timestamp reviewedAt;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "reviewer_id", referencedColumnName = "id")
    private User reviewer;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "reviewee_id", referencedColumnName = "id")
    private User reviewee;

    @NotNull
    @OneToOne(mappedBy = "review")
    private Ad ad;

    public Review() {
        //
    }

    public Review(
            String message,
            Float rating,
            User reviewer,
            User reviewee,
            Ad ad) {
        this.message = message;
        this.rating = rating;
        this.reviewer = reviewer;
        this.reviewee = reviewee;
        this.ad = ad;
    }

    @PrePersist
    public void prePersist() {
        reviewedAt = new Timestamp(System.currentTimeMillis());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public Timestamp getReviewedAt() {
        return reviewedAt;
    }

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
    }

    public User getReviewee() {
        return reviewee;
    }

    public void setReviewee(User reviewee) {
        this.reviewee = reviewee;
    }

    public Ad getAd() {
        return ad;
    }

    public void setAd(Ad ad) {
        this.ad = ad;
    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", rating=" + rating +
                ", reviewedAt=" + reviewedAt +
                ", reviewer=" + reviewer +
                ", reviewee=" + reviewee +
                ", ad=" + ad +
                '}';
    }
}
