<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Template("default/index.html.twig")
     * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
    */

    public function index() {
        return [];
    }
}
