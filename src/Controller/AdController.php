<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\AdRepository;
use App\Repository\UserRepository;
use App\Repository\PhotoRepository;
use App\Entity\Ad;
use App\Entity\User;
use App\Utils\JsonResponseFactory;


class AdController extends AbstractController
{
    /**
     * @Route("/api/private", name="private", methods={"GET"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function private(Request $request, Security $security)
    {
        $user = $security->getToken()->getUser();
        return JsonResponseFactory::PrepareJsonResponse($user);
    }
    /**
     * @Route("/api/postAd", name="postAd", methods={"POST"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function postAd(Request $request, ValidatorInterface $validator): Response 
    {
        $data = json_decode($request->getContent(), true);
        
        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(User::class)->find((int) $data['creator']);

        $ad = new Ad();
        $ad->setTitle($data['title']);
        $ad->setAuthor($data['author']);
        $ad->setCondition((float) $data['condition']);
        $ad->setPrice((float) $data['price']);
        $ad->setDescription($data['description']);
        $ad->setCreator($user);

        //todo photos upload
        $errors = $validator->validate($ad);
        if (count($errors) > 0) {
            return JsonResponseFactory::PrepareJsonResponse((string) $errors);
        }

        try {
            $user->addAd($ad);
            $entityManager->persist($ad);
            $entityManager->flush();
            $response = JsonResponseFactory::PrepareJsonResponse("succes");
        } catch (UniqueConstraintViolationException $e) {
            $response = JsonResponseFactory::PrepareJsonResponse($e->getMessage());
        }

        return $response;
    }

    /**
     * @Route("/api/getAd", name="getAd", methods={"GET"})
     * @param AdRepository $adRepository
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getAdById(Request $request): Response
    {
        $data = $request->query->all();
        
        $entityManager = $this->getDoctrine()->getManager();
        $ad = $entityManager->getRepository(Ad::class)->find((int) $data['id']);

        if (!$ad) {
            throw $this->createNotFoundException('No ad found for id '.$data);
        }

        $response = JsonResponseFactory::prepareJsonResponse($ad);
        return $response;
    }

    /**
     * @Route("/api/editAd", name="editAd", methods={"PUT"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function editAd(Request $request, ValidatorInterface $validator): Response
    {
        $data = json_decode($request->getContent(), true); //działa

        $entityManager = $this->getDoctrine()->getManager();
        $ad = $entityManager->getRepository(Ad::class)->find((int) $data['adId']);

        if (!$ad) {
            throw $this->createNotFoundException('No ad found for id '.$data['adId']);
        }

        if ($data['title'] != ''){
            $ad->setTitle($data['title']);
        }

        if ($data['author'] != ''){
            $ad->setAuthor($data['author']);
        }

        if ($data['condition'] != ''){
            $ad->setCondition((float) $data['condition']);
        }

        if ($data['price'] != ''){
            $ad->setPrice((float) $data['price']);
        }

        if ($data['description'] != ''){
            $ad->setDescription($data['description']);
        }
        
        //todo photos

        $errors = $validator->validate($ad);
        if (count($errors) > 0) {
            return JsonResponseFactory::PrepareJsonResponse((string) $errors);
        }

        try {
            $entityManager->flush();
            $response = JsonResponseFactory::PrepareJsonResponse("succes");
        } catch (UniqueConstraintViolationException $e) {
            $response = JsonResponseFactory::PrepareJsonResponse($e->getMessage());
        }

        return $response;
    }
    
    /**
     * @Route("/api/starAd", name="starAd", methods={"POST", "DELETE"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function starAd(Request $request, ValidatorInterface $validator): Response 
    {
        $data = json_decode($request->getContent(), true);

        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(User::class)->find((int) $data['userId']);
        $ad = $entityManager->getRepository(Ad::class)->find((int)  $data['adId']);

        if($user->getStarredAds()->contains($ad)) {
            $user->removeStarredAd($ad);
        }
        else{
            $user->addStarredAd($ad);
        }

        $errors = $validator->validate($ad);
        if (count($errors) > 0) {
            return JsonResponseFactory::PrepareJsonResponse((string) $errors);
        }

        try {
            $entityManager->flush();
            //$user->getStarredAds()->addStarredAd();
            $response = JsonResponseFactory::PrepareJsonResponse("succes");
        } catch (UniqueConstraintViolationException $e) {
            $response = JsonResponseFactory::PrepareJsonResponse($e->getMessage());
        }
        
        return $response;
    }

    /**
     * @Route("/api/getLastestAds", name="getLastestAds", methods={"GET"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getLastestAds(Request $request, AdRepository $adRepository): Response
    {
        return JsonResponseFactory::PrepareJsonResponse($adRepository->getLastestOffers());
    }
}