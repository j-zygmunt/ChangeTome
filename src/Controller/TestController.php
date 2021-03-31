<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{
    /**
     * @Route("/api/users", name="users")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */

    public function getResponse(): Response
    {
        $user = [
            'id' => 'mercury',
            'name' => 'Mercury',
            'moons' => 0,
            'diameter' => 4879,
            'distanceFromSun' => 57.9,
        ];
        
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($user));
        
        return $response;
    }
}
