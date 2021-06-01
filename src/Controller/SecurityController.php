<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Utils\JsonResponseFactory;
use App\Entity\User;
use App\Repository\UserRepository;

class SecurityController extends AbstractController
{
    /**
     * @Route("/api/register", name="register", methods={"POST"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function register(Request $request, ValidatorInterface $validator, UserPasswordEncoderInterface $encoder): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $data = json_decode($request->getContent(), true);
        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword($encoder->encodePassword($user, $data['password']));
        $user->setName($data['name']);
        $user->setSurname($data['surname']);
        $user->setPhone($data['phone']);
        $user->setIsActive(false);

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            return JsonResponseFactory::PrepareJsonResponse((string) $errors);
        }

        try {
            $entityManager->persist($user);
            $entityManager->flush();
            $response = JsonResponseFactory::PrepareJsonResponse("succes");
        } catch (UniqueConstraintViolationException $e) {
            $response = JsonResponseFactory::PrepareJsonResponse($e->getMessage());
        }

        return $response;
    }

    /**
     * @Route("/api/private/isAuthorized", name="isAuthorized", methods={"GET"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getAuthorizedUser(Security $security) {
        $token = $security->getToken();
        return JsonResponseFactory::PrepareJsonResponse($token);
    }
}
