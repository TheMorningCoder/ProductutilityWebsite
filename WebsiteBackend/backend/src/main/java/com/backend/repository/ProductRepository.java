package com.backend.repository;

import com.backend.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Integer> {
	@Query(value = "select * from product_model where " + " code like %:query% " + " or brand like %:query% " + " or category like %:query% " + " or price like %:query% "
			+ " or name like %:query% ", nativeQuery = true)
	public List<ProductModel> searchProducts(String query);

//	@Query("from product_model as p where p.brand=:brand")
//	public Page<ProductModel> findProductsByBrand(@Param("brand")int userId, Pageable pePageable);
	
}

