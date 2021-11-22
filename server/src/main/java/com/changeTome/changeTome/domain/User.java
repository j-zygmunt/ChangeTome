package com.changeTome.changeTome.domain;

import com.changeTome.changeTome.utils.UserRole;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "User")
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(name = "user_email_unique", columnNames = "email_address"),
        @UniqueConstraint(name = "user_phone_number_unique", columnNames = "phone_number")
})
public class User {

    @Id
    @SequenceGenerator(name = "user_seq", sequenceName = "user_seq", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "user_seq")
    @Column(name = "id", updatable = false)
    private Long id;

    @NotBlank
    @Column(name = "name", columnDefinition = "TEXT")
    private String name;

    @NotBlank
    @Column(name = "surname", columnDefinition = "TEXT")
    private String surname;

    @NotBlank
    @Column(name = "phone_number", columnDefinition = "TEXT")
    private String phoneNumber;

    @NotNull
    @Column(name = "is_active")
    private Boolean isActive;

    @NotBlank
    @Column(name = "email_address", columnDefinition = "TEXT")
    private String emailAddress;

    @NotEmpty
    @Column(name = "password", columnDefinition = "TEXT")
    private String password;

    @Column(name = "avatar", columnDefinition = "TEXT")
    private String avatar;

    @NotNull
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "id_address", referencedColumnName = "id")
    private Address address;

    @OneToMany(mappedBy = "user")
    private Set<Ad> ads = new HashSet<>();

    @OneToMany(mappedBy = "receiver")
    private Set<Message> receivedMessages = new HashSet<>();

    @OneToMany(mappedBy = "sender")
    private Set<Message> sentMessages = new HashSet<>();

    @OneToMany(mappedBy = "reviewee")
    private Set<Review> receivedReviews = new HashSet<>();

    @OneToMany(mappedBy = "reviewer")
    private Set<Review> givenReviews = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<StarredAd> starredAds = new HashSet<>();

    @NotNull
    @Enumerated(EnumType.STRING)
    private UserRole role;

    public User() {
        //
    }

    public User(String name,
                String surname,
                String phoneNumber,
                String emailAddress,
                String password) {
        this.name = name;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.password = password;
    }

    @PrePersist
    public void prePersist() {
        createdAt = new Timestamp(System.currentTimeMillis());
        role = UserRole.USER;
        isActive = false;
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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Boolean isActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public void setAsActive() {
        isActive = true;
    }

    public void setAsNotActive() {
        isActive = false;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Set<Ad> getAds() {
        return ads;
    }

    public void setAds(Set<Ad> ads) {
        this.ads = ads;
    }

    public Set<Message> getReceivedMessages() {
        return receivedMessages;
    }

    public void setReceivedMessages(Set<Message> receivedMessages) {
        this.receivedMessages = receivedMessages;
    }

    public Set<Message> getSentMessages() {
        return sentMessages;
    }

    public void setSentMessages(Set<Message> sentMessages) {
        this.sentMessages = sentMessages;
    }

    public Set<Review> getReceivedReviews() {
        return receivedReviews;
    }

    public void setReceivedReviews(Set<Review> receivedReviews) {
        this.receivedReviews = receivedReviews;
    }

    public Set<Review> getGivenReviews() {
        return givenReviews;
    }

    public void setGivenReviews(Set<Review> givenReviews) {
        this.givenReviews = givenReviews;
    }

    public Set<StarredAd> getStarredAds() {
        return starredAds;
    }

    public void setStarredAds(Set<StarredAd> starredAds) {
        this.starredAds = starredAds;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", isActive=" + isActive +
                ", emailAddress='" + emailAddress + '\'' +
                ", password='" + password + '\'' +
                ", avatar='" + avatar + '\'' +
                ", createdAt=" + createdAt +
                ", address=" + address +
                ", ads=" + ads +
                ", receivedMessages=" + receivedMessages +
                ", sentMessages=" + sentMessages +
                ", receivedReviews=" + receivedReviews +
                ", givenReviews=" + givenReviews +
                ", role=" + role +
                '}';
    }
}
