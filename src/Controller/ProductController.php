<?php


namespace ExampleApp\Controller;


use Laminas\Diactoros\ServerRequest;

class ProductController extends BaseController
{
    public function show(ServerRequest $request, $productSlug) {
        $slug = $request->getAttribute('slug');
        $product = $this->getProductBySlug($slug);
        $products = json_decode(file_get_contents(dirname(__DIR__).'/home_products.json'));
        $recommended = $this->getRecommendedProducts($products, $slug);
        $serviceText = array("Accessories", "Bar 24 hours", "Cleaning service", "Phone", "Restaurant", "Spa zone", "Transport", "Wi-Fi");

        if (!$product) {
            echo '404';
            die();
        }

        return $this->render('product.html.twig', [
            'product' => $product,
            'products' => $products,
            'recommended' => $recommended,
            'keys' => $this->getKeys($product),
            'services' => $serviceText
        ]);
    }

    /**
     * @param $slug
     * @return mixed|null
     */
    private function getProductBySlug($slug) {
        $products = json_decode(file_get_contents(dirname(__DIR__).'/home_products.json'));

        foreach ($products as $product) {

            if ($product->slug === $slug) {
                return $product;
            }
        }

        return null;
    }

    private function getRecommendedProducts($products, $slug) {
        foreach($products as $key => $product) {
            if ($product->slug === $slug) {
                unset($products[$key]);
                break;
            }
        }
        $products = array_values($products);
        shuffle($products);
        $recommended = array($products[0], $products[1]);
        return $recommended;
    }

    private function getKeys($product) {
        $array = array();
        foreach ($product->services as $service) {
            foreach ($service as $key => $e) {
                array_push($array, $key);
            }
        }
        return $array;
    }

}
