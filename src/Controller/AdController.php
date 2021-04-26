<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\AdRepository;
use App\Repository\PhotoRepository;
use App\Entity\Ad;

class AdController extends AbstractController
{
    /**
     * @Route("/api/postAd", name="postAd", methods={"POST"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function postAd(Request $request): Response 
    {
        $entityManager = $this->getDoctrine()->getManager();

        $ad = new Ad();
        $output = json_decode($request->getContent(), true);
        $ad->setTitle($output['title']);
        $ad->setAuthor($output['author']);
        $ad->setCondition($output['condition']);
        $ad->setPrice($output['price']);
        $ad->setDescription($output['description']);
        $ad->setCreator($output['creator']);
        
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($output['test2']));

        return $response;
    }

    /**
     * @Route("/api/getAd{id}", name="getAd", methods={"GET"})
     * @param AdRepository $adRepository
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getAdById(int $id, AdRepository $adRepository): Response
    {
        $ad = $adRepository->find($id);

        if (!$ad) {
            throw $this->createNotFoundException('No user found for id '.$id);
        }

        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($ad));

        return $response;
    }



}
