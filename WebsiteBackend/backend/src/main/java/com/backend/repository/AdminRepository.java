package com.backend.repository;

import com.backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    public Admin findByEmail(String email);
    public Admin findByEmailAndPassword(String email,String password);

}

