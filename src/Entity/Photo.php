<?php

namespace App\Entity;

use App\Repository\PhotoRepository;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Entity(repositoryClass=PhotoRepository::class)
 */
class Photo implements JsonSerializable
{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="datetime")
     */
    private $uploaded_at;

    /**
     * @ORM\ManyToOne(targetEntity=Ad::class, inversedBy="photos")
     * @ORM\JoinColumn(nullable=false)
     */
    private $idAd;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getUploadedAt(): ?\DateTimeInterface
    {
        return $this->uploaded_at;
    }

    public function setUploadedAt(\DateTimeInterface $uploaded_at): self
    {
        $this->uploaded_at = $uploaded_at;

        return $this;
    }

    public function getIdAd(): ?Ad
    {
        return $this->idAd;
    }

    public function setIdAd(?Ad $idAd): self
    {
        $this->idAd = $idAd;

        return $this;
    }

    /**
     * @ORM\PrePersist
     */
    public function setUploadedAtValue()
    {
        $this->uploaded_at = new \DateTime();
    }

    public function jsonSerialize()
    {
        return (object) get_object_vars($this);
    }
}
