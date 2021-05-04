<?php

namespace App\Entity;

use App\Repository\ReviewsRepository;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Entity(repositoryClass=ReviewsRepository::class)
 * @ORM\HasLifecycleCallbacks
 */
class Reviews implements JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=2000)
     */
    private $message;

    /**
     * @ORM\Column(type="float")
     */
    private $rating;

    /**
     * @ORM\Column(type="datetime")
     */
    private $reviewedAt;

    /**
     * @ORM\OneToOne(targetEntity=Ad::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $ad;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $reviewer;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="reviews")
     * @ORM\JoinColumn(nullable=false)
     */
    private $reviewee;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getRating(): ?string
    {
        return $this->rating;
    }

    public function setRating(string $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getReviewedAt(): ?\DateTimeInterface
    {
        return $this->reviewedAt;
    }

    public function setReviewedAt(\DateTimeInterface $reviewedAt): self
    {
        $this->reviewedAt = $reviewedAt;

        return $this;
    }

    public function getAd(): ?Ad
    {
        return $this->ad;
    }

    public function setAd(Ad $ad): self
    {
        $this->ad = $ad;

        return $this;
    }

    public function getReviewer(): ?User
    {
        return $this->reviewer;
    }

    public function setReviewer(?User $reviewer): self
    {
        $this->reviewer = $reviewer;

        return $this;
    }

    public function getReviewee(): ?User
    {
        return $this->reviewee;
    }

    public function setReviewee(?User $reviewee): self
    {
        $this->reviewee = $reviewee;

        return $this;
    }

    /**
     * @ORM\PrePersist
     */
    public function setReviewedAtValue()
    {
        $this->reviewedAt = new \DateTime();
    }

    public function jsonSerialize()
    {
        return (object) get_object_vars($this);
    }
}
