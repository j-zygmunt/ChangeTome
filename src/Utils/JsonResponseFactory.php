<?php

namespace App\Utils;

use Symfony\Component\HttpFoundation\Response;

class JsonResponseFactory
{
    public static function prepareJsonResponse(): Response 
    {
        $args = func_num_args();

        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($args));

        return $response;
    }
}