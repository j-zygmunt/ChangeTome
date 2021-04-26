<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Repository\AddressRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Entity\Ad;
use App\Utils\JsonResponseFactory;

class UserController extends AbstractController
{
    /**
     * @Route("/api/getUser{id}", name="user", methods={"GET"})
     * @param userRepository $userRepository
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUserById(int $id, UserRepository $userRepository): Response
    {
        $user = $userRepository->find($id);

        if (!$user) {
            throw $this->createNotFoundException('No user found for id '.$id);
        }

        $response = JsonResponseFactory::prepareJsonResponse($user);
        return $response;
    }

    /**
     * @Route("/api/getUsersAds{id}", name="usersAds", methods={"GET"})
     * @param userRepository $userRepository
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUsersAds(int $id, UserRepository $userRepository): Response
    {
        $user = $userRepository->find($id);

        if (!$user) {
            throw $this->createNotFoundException('No user found for id '.$id);
        }

        $ads = $user->getAds();
        $response = JsonResponseFactory::prepareJsonResponse($ads);
        return $response;
    }

    /**
     * @Route("/api/getUsersStarredAds{id}", name="usersStarredAds", methods={"GET"})
     * @param userRepository $userRepository
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUsersStarredAds(int $id, UserRepository $userRepository): Response
    {
        $user = $userRepository->find($id);

        if (!$user) {
            throw $this->createNotFoundException('No user found for id '.$id);
        }

        $starredAds = $user->getStarredAds();
        $response = JsonResponseFactory::prepareJsonResponse($starredAds);
        return $response;
    }

    /**
     * @Route("/api/getUsersAddress{id}", name="usersAddress", methods={"GET"})
     * @param userRepository $userRepository
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUsersAddress(int $id, UserRepository $userRepository, AddressRepository $addressRepository): Response
    {
        $user = $userRepository->find($id);

        if (!$user) {
            throw $this->createNotFoundException('No user found for id '.$id);
        }

        $idAddress = $user->getIdAddress();
        $address = $addressRepository->find($idAddress);

        $response = JsonResponseFactory::prepareJsonResponse($address);
        return $response;
    }
}
