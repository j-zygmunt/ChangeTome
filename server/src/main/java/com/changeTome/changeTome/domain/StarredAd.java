package com.changeTome.changeTome.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Entity(name = "StarredAds")
@Table(name = "starred_ads")
public class StarredAd {

    @EmbeddedId
    StarredAdKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "id_user")
    User user;

    @ManyToOne
    @MapsId("adId")
    @JoinColumn(name = "id_ad")
    Ad ad;

    @NotNull
    @Column(name = "created_at")
    private Timestamp createdAt;

    public StarredAd() {
        //
    }

    public StarredAd(
            StarredAdKey id,
            User user,
            Ad ad) {
        this.id = id;
        this.user = user;
        this.ad = ad;
    }

    @PrePersist
    public void prePersist() {
        createdAt = new Timestamp(System.currentTimeMillis());
    }

    public StarredAdKey getId() {
        return id;
    }

    public void setId(StarredAdKey id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Ad getAd() {
        return ad;
    }

    public void setAd(Ad ad) {
        this.ad = ad;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    @Override
    public String toString() {
        return "StarredAd{" +
                "id=" + id +
                ", user=" + user +
                ", ad=" + ad +
                ", createdAt=" + createdAt +
                '}';
    }
}
