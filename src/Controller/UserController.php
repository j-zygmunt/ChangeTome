<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("/api/getUser", name="userr")
     * @param userRepository $userRepository
     */
    public function getUsers(UserRepository $userRepository): Response
    {
        $users = $userRepository->findAll();

        if (!$users) {
            throw $this->createNotFoundException('error');
        }

        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($users));

        return $response;
    }
}
