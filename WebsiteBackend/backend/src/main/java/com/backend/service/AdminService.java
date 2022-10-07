package com.backend.service;

import com.backend.model.Admin;
import com.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAllUserDetails() {
        List<Admin> adminList = (List<Admin>) adminRepository.findAll();
        return adminList;
    }

    public Admin saveUser(Admin user){
        return adminRepository.save(user);
    }

    public Admin fetchUserByEmailId(String email) {
        return  adminRepository.findByEmail(email);
    }

    public Admin fetchUserByEmailAndPassword(String email,String password) {
        return  adminRepository.findByEmailAndPassword(email,password);
    }


}


