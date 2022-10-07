package com.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.model.ReviewModel;
import com.backend.repository.ReviewRepository;

@Service
public class ReviewService {
	@Autowired
	private ReviewRepository reviewRepository;

	public List<ReviewModel> getreviewDetails() {
		List<ReviewModel> reviewModelList = (List<ReviewModel>) reviewRepository.findAll();
		return reviewModelList;
	}

	public ReviewModel insertReviewDetails(ReviewModel review) {
		Date date = new Date();
		review.setDate(date);
		return reviewRepository.save(review);
	}

	public Optional<ReviewModel> getReviewById(int id) {
		return reviewRepository.findById(id);
	}
	public List<ReviewModel> searchReviews(Integer pid) {
        List<ReviewModel> reviewModelList=reviewRepository.searchReviews(pid);
        return reviewModelList;
    }
	public void deleteReviewById(int id) {
        reviewRepository.deleteById(id);
    }
	public void saveEditReview(ReviewModel reviewModel){
        reviewRepository.save(reviewModel);
    }
}
