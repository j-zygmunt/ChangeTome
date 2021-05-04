<?php

namespace App\Utils;

use Symfony\Component\HttpFoundation\Response;

class JsonResponseFactory
{
    public static function prepareJsonResponse($arg): Response 
    {
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($arg));

        return $response;
    }
}