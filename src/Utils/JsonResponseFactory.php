<?php

namespace App\Utils;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Serializer;

class JsonResponseFactory
{
    public static function prepareJsonResponse($arg): Response 
    {
        $encoder = new JsonEncoder();
        $defaultContext = [
            ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return "WARNING! (circular reference)";
            },
        ];
        $normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);
        $serializer = new Serializer([$normalizer], [$encoder]);

        $response = new Response($serializer->serialize($arg, 'json'));
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        
        return $response;
    }
}