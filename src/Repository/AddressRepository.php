<?php

namespace App\Repository;

use App\Entity\Address;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Address|null find($id, $lockMode = null, $lockVersion = null)
 * @method Address|null findOneBy(array $criteria, array $orderBy = null)
 * @method Address[]    findAll()
 * @method Address[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AddressRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Address::class);
    }

    // /**
    //  * @return Address[] Returns an array of Address objects
    //  */
    /*
    public function findByvalue($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    public function checkIfAddressExists($city, $country): ?Address
    {
        return $this->createQueryBuilder('address')
            ->andWhere('address.city = :ci')
            ->setParameter('ci', $city)
            ->andWhere('address.country = :co')
            ->setParameter('co', $country)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
}
