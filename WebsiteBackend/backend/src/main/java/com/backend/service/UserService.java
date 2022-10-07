package com.backend.service;

import com.backend.model.UserModel;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserModel> getAllUserDetails() {
        List<UserModel> userList = (List<UserModel>) userRepository.findAll();
        return userList;
    }

    public UserModel saveUser(UserModel user){
        return userRepository.save(user);
    }

    public UserModel fetchUserByEmailId(String email) {
        return  userRepository.findByEmail(email);
    }

    public UserModel fetchUserByEmailAndPassword(String email,String password) {
        return  userRepository.findByEmailAndPassword(email,password);
    }


}

