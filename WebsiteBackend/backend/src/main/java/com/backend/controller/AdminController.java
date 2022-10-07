package com.backend.controller;

import com.backend.model.Admin;
import com.backend.repository.AdminRepository;
import com.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AdminController
{

    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/admins")
    @ResponseBody
    public Admin Admin(@RequestBody Admin admin) throws Exception {
        String tempEmailId = admin.getEmail();
        if (tempEmailId != null && !"".equals(tempEmailId)) {
            Admin adminObj = adminService.fetchUserByEmailId(tempEmailId);
            if (adminObj != null) {
                throw new Exception("User with " + tempEmailId + " is already exist");
            }
        }
        Admin adminObj = null;
        adminObj = adminService.saveUser(adminObj);
        return adminObj;
    }

//    /** Login User */
    @PostMapping("/adminlogin")
    @ResponseBody
    public Admin loginUser(@RequestBody Admin user) throws Exception {
        String tempEmail = user.getEmail();
        String tempPass = user.getPassword();
        Admin adminObj = null;
        if(tempEmail != null && tempPass != null){
            adminObj= adminService.fetchUserByEmailAndPassword(tempEmail,tempPass);
        }
        if(adminObj == null){
            throw new Exception("User does not exist");
        }
        return adminObj;
    }
    //--------------------User Login Control-----------------------
    @RequestMapping(value = "/alladmins", method = RequestMethod.GET)
    @ResponseBody
    public List<Admin> getUserDetails() {
        List<Admin> adminList = adminService.getAllUserDetails();
        return adminList;
    }

}


