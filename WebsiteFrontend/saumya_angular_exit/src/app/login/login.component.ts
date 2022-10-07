import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { UserRegistration } from '../user-registration';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: UserRegistration = new UserRegistration();
  msg = '';

  // model: ILogin = { email: "admin@gmail.com", password: "12345" };
  public loginData!: FormGroup;


  constructor(private toast:NgToastService, private http: HttpClient, private userapi: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginData = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  // get f() { return this.loginData.value; }  

  loginUser() {
    if (this.loginData.invalid) {
      return;
    }
    else {
      this.user.email = this.loginData.value.email;
      this.user.password = this.loginData.value.password;

      console.log(this.user);
      this.userapi.loginUserFromRemote(this.user).subscribe(
        data => {
          // alert("Login Success");
          this.toast.success({detail:"Successfully LoggedIn", summary:"Login Success", duration:5000})
          sessionStorage.setItem('id', data.id);
          sessionStorage.setItem('email', data.email);
          this.router.navigate(['/homepage'])
        },
        error => {
          console.log("exception ocurred");
          this.msg = "Bad Credentials, Please enter valid Email and Password";
          this.toast.error({detail:"Error Occoured", summary:"Login Failed, Try again", duration:5000})

        }
      )

    }
  }

  // loginUser(){
  //   this.user.email=this.loginData.value.email;
  //   this.user.password=this.loginData.value.password;

  //   console.log(this.user);
  //   this.userapi.loginUserFromRemote(this.user).subscribe(
  //     data =>{
  //       alert("Login Success");
  //       this.router.navigate(['/'])
  //     },
  //     error =>{ console.log("exception ocurred");
  //   this.msg="Bad Credentials,Please enter valid EmailId and Password";
  //   }
  //   )
  //   }


  // loginUser(){
  //   this.http.get<any>("http://localhost:8182/allusers")
  //   .subscribe(res=>{
  //     const user=res.find((a:any)=>{
  //       return a.email===this.loginData.value.email && a.password===this.loginData.value.password
  //     })
  //     if(user){
  //       console.log(user);
  //       alert("Login Success");
  //       this.loginData.reset()
  //       this.router.navigate(['/'])
  //     }else{
  //       this.msg="Bad Credentials,Please enter valid EmailId and Password";
  //       alert("User not find")
  //     }
  //   },err=>{
  //     alert("Something went wrong...!")
  //     this.msg="Bad Credentials,Please enter valid EmailId and Password";
  //   })
  // }

  // gotoregistration(){
  //   this.router.navigate(['/registration'])
  // }



}
