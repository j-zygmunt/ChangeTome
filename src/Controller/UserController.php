<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Repository\UserRepository;
use App\Repository\AddressRepository;
use App\Entity\User;
use App\Entity\Ad;
use App\Utils\JsonResponseFactory;

class UserController extends AbstractController
{
    /**
     * @Route("/api/getUser", name="user", methods={"GET"})
     * @param userRepository $userRepository
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUserById(Request $request): Response
    {
        $data = $request->query->all();
        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(User::class)->find((int) $data['id']);

        if (!$user) {
            throw $this->createNotFoundException('No user found for id '.$id);
        }

        $response = JsonResponseFactory::prepareJsonResponse($user);
        return $response;
    }

    /**
     * @Route("/api/getUsersAds", name="usersAds", methods={"GET"})
     * @param userRepository $userRepository
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUsersAds(Request $request): Response
    {
        $data = $request->query->all();
        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(User::class)->findOneByEmail($data['email']);

        if (!$user) {
            throw $this->createNotFoundException('No user found for id '.$id);
        }
        
        $ads = $user->getAds()->toArray();
        $response = JsonResponseFactory::prepareJsonResponse($ads);
        return $response;
    }

    /**
     * @Route("/api/getUsersStarredAds", name="usersStarredAds", methods={"GET"})
     * @param userRepository $userRepository
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUsersStarredAds(Request $request): Response
    {
        $data = $request->query->all();
        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(User::class)->findOneByEmail($data['email']);;

        if (!$user) {
            throw $this->createNotFoundException('No user found for id '.$id);
        }

        $starredAds = $user->getStarredAds()->toArray();
        $response = JsonResponseFactory::prepareJsonResponse($starredAds);
        return $response;
    }

    /**
     * @Route("/api/getUsersAddress/{id}", name="usersAddress", methods={"GET"})
     * @param userRepository $userRepository
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUsersAddress(int $id, UserRepository $userRepository, AddressRepository $addressRepository): Response
    {
        $user = $userRepository->find((int) $id);

        if (!$user) {
            throw $this->createNotFoundException('No user found for id '.$id);
        }

        $idAddress = $user->getIdAddress();
        $address = $addressRepository->find($idAddress);

        $response = JsonResponseFactory::prepareJsonResponse($address);
        return $response;
    }

    /**
     * @Route("/api/editUser", name="editUser", methods={"PUT"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function editUser(Request $request, ValidatorInterface $validator): Response
    {
        $data = json_decode($request->getContent(), true);

        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(User::class)->find((int) $data['userId']);

        if (!$user) {
            throw $this->createNotFoundException('No user found for id '.$id);
        }

        if ($data['email'] != ''){
            $user->setEmail($data['email']);
        }

        if ($data['password'] != ''){
            $user->setEmail($data['password']);
        }

        if ($data['phone'] != ''){
            $user->setEmail($data['phone']);
        }

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            return JsonResponseFactory::PrepareJsonResponse($errors[0]->getMessage().'.');
        }

        try {
            $entityManager->flush();
            $response = JsonResponseFactory::PrepareJsonResponse("success");
        } catch (UniqueConstraintViolationException $e) {
            $response = JsonResponseFactory::PrepareJsonResponse($e->getMessage());
        }

        return $response;
    }
}
