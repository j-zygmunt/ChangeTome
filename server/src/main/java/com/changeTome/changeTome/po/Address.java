package com.changeTome.changeTome.po;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "Address")
@Table(name = "addresses")
public class Address {

    @Id
    @SequenceGenerator(name = "address_seq", sequenceName = "address_seq", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "address_seq")
    @Column(name = "id", updatable = false)
    private Long id;

    @NotBlank
    @Column(name = "country", columnDefinition = "TEXT")
    private String country;

    @NotBlank
    @Column(name = "city", columnDefinition = "TEXT")
    private String city;

    @OneToMany(mappedBy = "address")
    private Set<User> users = new HashSet<>();

    public Address() {
        //
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", users=" + users +
                '}';
    }
}
