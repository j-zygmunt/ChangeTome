package com.changeTome.changeTome.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "Book")
@Table(name = "books")
public class Book {

    @Id
    @SequenceGenerator(name = "book_seq", sequenceName = "book_seq", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "book_seq")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "googleBookId", updatable = false, columnDefinition = "TEXT")
    private String googleBookId;

    @NotBlank
    @Column(name = "author", columnDefinition = "TEXT")
    private String author;

    @NotBlank
    @Column(name = "title", columnDefinition = "TEXT")
    private String title;

    @Column(name = "publisher", columnDefinition = "TEXT")
    private String publisher;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private Set<Ad> ads = new HashSet<>();

    public Book() {
        //
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGoogleBookId() {
        return googleBookId;
    }

    public void setGoogleBookId(String googleBookId) {
        this.googleBookId = googleBookId;
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

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Set<Ad> getAds() {
        return ads;
    }

    public void setAds(Set<Ad> ads) {
        this.ads = ads;
    }
}
