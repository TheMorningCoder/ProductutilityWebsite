package com.backend.repository;


import com.backend.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel, Integer> {

    public UserModel findByEmail(String email);
    public UserModel findByEmailAndPassword(String email,String password);

}
