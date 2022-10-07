package com.backend.repository;


import com.backend.model.ReviewModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<ReviewModel, Integer> {

    @Query(value = "select * from review where " +
            " product_id = :pid " , nativeQuery = true)
    List<ReviewModel> searchReviews(Integer pid);

}
