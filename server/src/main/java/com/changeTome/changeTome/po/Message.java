package com.changeTome.changeTome.po;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "Message")
@Table(name = "messages")
public class Message {

    @Id
    @SequenceGenerator(name = "message_seq", sequenceName = "message_seq", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "message_seq")
    @Column(name = "id", updatable = false)
    private Long id;

    @NotEmpty
    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @NotNull
    @Column(name = "sent_at")
    private Timestamp sentAt;

    @Column(name = "read_at")
    private Timestamp readAt;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_receiver", referencedColumnName = "id")
    private User sender;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_sender", referencedColumnName = "id")
    private User receiver;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_ad", referencedColumnName = "id")
    private Ad ad;

    public Message() {
        //
    }

    public Message(
            String message,
            User sender,
            User receiver,
            Ad ad) {
        this.message = message;
        this.sender = sender;
        this.receiver = receiver;
        this.ad = ad;
    }

    @PrePersist
    public void prePersist() {
        sentAt = new Timestamp(System.currentTimeMillis());
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

    public Timestamp getSentAt() {
        return sentAt;
    }

    public Timestamp getReadAt() {
        return readAt;
    }

    public void setReadAt(Timestamp readAt) {
        this.readAt = readAt;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public Ad getAd() {
        return ad;
    }

    public void setAd(Ad ad) {
        this.ad = ad;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", sentAt=" + sentAt +
                ", readAt=" + readAt +
                ", sender=" + sender +
                ", receiver=" + receiver +
                ", ad=" + ad +
                '}';
    }
}
