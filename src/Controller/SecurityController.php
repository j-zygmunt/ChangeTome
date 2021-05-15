<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Utils\JsonResponseFactory;
use App\Entity\User;
use App\Repository\UserRepository;

class SecurityController extends AbstractController
{
    /**
     * @Route("/api/login_check", name="login", methods={"POST"})
     * @param userRepository $userRepository
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function login(int $id, UserRepository $userRepository): Response
    {
        $response = JsonResponseFactory::prepareJsonResponse("not implemented");
        return $response;
    }

    /**
     * @Route("/api/register", name="register", methods={"POST"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function addUser(Request $request, ValidatorInterface $validator, UserPasswordEncoderInterface $encoder): Response
    {
        $data = json_decode($request->getContent(), true);
        $user = new User();
        $xd = $encoder->encodePassword($user, $data['password']);
        return JsonResponseFactory::PrepareJsonResponse($xd);

        $entityManager = $this->getDoctrine()->getManager();

        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword($data['password']);
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
}
