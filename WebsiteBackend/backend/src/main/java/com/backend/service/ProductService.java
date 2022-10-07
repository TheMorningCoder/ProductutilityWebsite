package com.backend.service;

import com.backend.model.ProductModel;
import com.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;

	public List<ProductModel> getProductDetails() {
		List<ProductModel> productList = (List<ProductModel>) productRepository.findAll();
		return productList;
	}

	public ProductModel insertProductDetail(ProductModel product) {
		return productRepository.save(product);
	}

	public Optional<ProductModel> getProductByCode(int code) {
		return productRepository.findById(code);
	}

	public List<ProductModel> searchProducts(String query) {
		List<ProductModel> productModelList = productRepository.searchProducts(query);
		return productModelList;
	}

}
