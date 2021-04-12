<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdController extends AbstractController
{
    /**
     * @Route("/api/getAds", name="Ads")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getAds(): Response 
    {
        
    }
}
