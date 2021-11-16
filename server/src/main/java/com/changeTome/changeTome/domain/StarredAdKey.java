package com.changeTome.changeTome.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class StarredAdKey implements Serializable {

    @Column(name = "id_user")
    Long userId;

    @Column(name = "id_ad")
    Long adId;

    public StarredAdKey() {
        //
    }

    public StarredAdKey(
            Long userId,
            Long adId) {
        this.userId = userId;
        this.adId = adId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getAdId() {
        return adId;
    }

    public void setAdId(Long adId) {
        this.adId = adId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        StarredAdKey that = (StarredAdKey) o;
        return Objects.equals(userId, that.userId) && Objects.equals(adId, that.adId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, adId);
    }
}
