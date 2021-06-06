<?php

namespace App\Repository;

use App\Entity\Ad;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Ad|null find($id, $lockMode = null, $lockVersion = null)
 * @method Ad|null findOneBy(array $criteria, array $orderBy = null)
 * @method Ad[]    findAll()
 * @method Ad[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AdRepository extends ServiceEntityRepository
{
    public const PAGINATOR_PER_PAGE = 12;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ad::class);
    }

    public function countSearchResults(string $phase){
        return $this->createQueryBuilder('ad')
            ->andWhere('ad.title LIKE :phase OR ad.author LIKE :phase')
            ->setParameter('phase', '%'.$phase.'%')
            ->select('count(ad.id)')
            ->getQuery()
            ->getSingleScalarResult()
        ;
    }

    public function findBysearchPhase(string $phase, int $offset): Paginator
    {
        $query = $this->createQueryBuilder('ad')
            ->andWhere('ad.title LIKE :phase OR ad.author LIKE :phase')
            ->setParameter('phase', '%'.$phase.'%')
            ->orderBy('ad.createdAt', 'DESC')
            ->setMaxResults(self::PAGINATOR_PER_PAGE)
            ->setFirstResult($offset)
            ->getQuery()
        ;
        return new Paginator($query);
    }

    public function getLastestOffers()
    {
        return $this->createQueryBuilder('ad')
            ->orderBy('ad.createdAt', 'DESC')
            ->setMaxResults(6)
            ->getQuery()
            ->getResult()
        ;
    }

    public function getOffersPaginator(int $offset): Paginator
    {
        $query = $this->createQueryBuilder('ad')
            ->orderBy('ad.createdAt', 'DESC')
            ->setMaxResults(self::PAGINATOR_PER_PAGE)
            ->setFirstResult($offset)
            ->getQuery()
        ;

        return new Paginator($query);
    }
}
