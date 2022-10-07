package com.backend.controller;

import com.backend.model.ProductModel;
import com.backend.model.UserModel;
import com.backend.repository.ProductRepository;
import com.backend.service.ProductService;
import com.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ProductsController {
    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

//    Get all products REST API
    @RequestMapping(value = "/products", method = RequestMethod.GET)
    @ResponseBody
    public List<ProductModel> home() {
        List<ProductModel> productList1 = productService.getProductDetails();
        return productList1;
    }

//    Insert product by id REST API
    @PostMapping("/products")
    @ResponseBody
    public ProductModel communityDetails(@RequestBody ProductModel product) {
        return productService.insertProductDetail(product);
    }

//    Get products by code REST API
    @GetMapping("/products/{code}")
    @ResponseBody
    public Optional<ProductModel> getProductByCode(@PathVariable int code) {
        Optional<ProductModel> productModel=productService.getProductByCode(code);
        return productModel;
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductModel>> searchProducts(@RequestParam("query") String query){
    	
        return ResponseEntity.ok(productService.searchProducts(query));
    }
    

//    Search Products Rest API
//    @GetMapping("/search")
//    public ResponseEntity<List<ProductModel>> searchProducts(@RequestParam("query") String query){
//        return ResponseEntity.ok(productService.searchProducts(query));
//    }
//    @GetMapping("/search/{query}")
//    public ResponseEntity<?> search(@PathVariable("query") String query, Principal principal){
//    	System.out.println(query);
//    	this.productRepository.searchProducts(query);
//    }






}

