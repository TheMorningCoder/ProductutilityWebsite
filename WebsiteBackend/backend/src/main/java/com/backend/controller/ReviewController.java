package com.backend.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.model.ReviewModel;
import com.backend.repository.ReviewRepository;
import com.backend.service.ReviewService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ReviewController {
	@Autowired
    ReviewRepository reviewRepository;
    @Autowired
    ReviewService reviewService;
    
    @RequestMapping(value = "/review", method = RequestMethod.GET)
    @ResponseBody
    public List<ReviewModel> getAllComment() {
        List<ReviewModel> reviewModelList = reviewService.getreviewDetails();
        return reviewModelList;
    }
    @PostMapping("/review")
    @ResponseBody
    public ReviewModel reviewDetails(@RequestBody ReviewModel review) {
        return reviewService.insertReviewDetails(review);
    }
    @GetMapping("/filterreview/{pid}")
    public List<ReviewModel> getReviewByPid(@PathVariable int pid){
    	List<ReviewModel> reviews = reviewService.searchReviews(pid);
        return reviews;
    }
    @GetMapping("/review/{id}")
    @ResponseBody
    public Optional<ReviewModel> getReviewById(@PathVariable Integer id) {
        Optional<ReviewModel> reviewModel=reviewService.getReviewById(id);
        return reviewModel;
    }

    @PutMapping("/editreview/{id}/{msg}")
    public Optional<ReviewModel> editReview(@PathVariable() Integer id, @PathVariable() String review) {

        Optional<ReviewModel> reviewModel = reviewService.getReviewById(id);
        ReviewModel reviewModel1 = reviewModel.get();
        reviewModel1.setReviewMessage(review);
        reviewService.saveEditReview(reviewModel1);
        return reviewModel;
    }
    @DeleteMapping("/deletereview/{id}")
    public void delete(@PathVariable Integer id) {
        reviewService.deleteReviewById(id);
    }

}

