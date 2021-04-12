<?php

namespace App\Entity;

use App\Repository\ReviewsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ReviewsRepository::class)
 */
class Reviews
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
}
