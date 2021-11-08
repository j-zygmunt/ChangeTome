package com.changeTome.changeTome.po;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "Photo")
@Table(name = "photos", uniqueConstraints = {
        @UniqueConstraint(name = "photo_name_unique", columnNames = "name")
})
public class Photo {

    @Id
    @SequenceGenerator(name = "photo_seq", sequenceName = "photo_seq", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "photo_seq")
    @Column(name = "id", updatable = false)
    private Long id;

    @NotBlank
    @Column(name = "name", columnDefinition = "TEXT")
    private String name;

    @Column(name = "uploaded_at")
    private Timestamp uploadedAt;

    @ManyToOne
    @JoinColumn(name = "id_ad", referencedColumnName = "id")
    private Ad ad;

    public Photo() {
        //
    }

    @PrePersist
    public void prePersist() {
        uploadedAt = new Timestamp(System.currentTimeMillis());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Timestamp getUploadedAt() {
        return uploadedAt;
    }

    public Ad getAd() {
        return ad;
    }

    public void setAd(Ad ad) {
        this.ad = ad;
    }
}
