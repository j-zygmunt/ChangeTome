<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Address;
use App\Repository\AddressRepository;
use App\Utils\JsonResponseFactory;

class AddressController extends AbstractController
{
    /**
     * @Route("/api/addAddress", name="getAddress", methods={"POST"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function addAddress(Request $request, ValidatorInterface $validator): Response
    {
        $output = json_decode($request->getContent(), true);

        $entityManager = $this->getDoctrine()->getManager();
        $address = $entityManager->getRepository(Adddress::class)->checkIfAddressExists((string) $output['city'], (string) $output['country']);
        
        if (!$address) {
            $response = JsonResponseFactory::PrepareJsonResponse("address already exists");
            return $response;
        }

        $address = new Address();
        $address->setCity((string) $output['city']);
        $address->setCountry((string) $output['country']);
        
        $errors = $validator->validate($address);
        if (count($errors) > 0) {
            return JsonResponseFactory::PrepareJsonResponse($errors[0]->getMessage().'.');
        }

        try {
            $entityManager->persist($address);
            $entityManager->flush();
            $response = JsonResponseFactory::PrepareJsonResponse("succes");
        } catch (UniqueConstraintViolationException $e) {
             $response = JsonResponseFactory::PrepareJsonResponse($e->getMessage());
        }

        return $response;
    }

    /**
     * @Route("/api/test", name="test", methods={"GET"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function checkAddress(Request $request, AddressRepository $addressRepository)
    {
        return JsonResponseFactory::PrepareJsonResponse($addressRepository->checkIfAddressExists("Kraków", "Polska"));
    }
}
