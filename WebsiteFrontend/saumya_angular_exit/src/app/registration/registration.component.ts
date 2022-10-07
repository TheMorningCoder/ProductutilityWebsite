import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../user-registration';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService} from '../shared/product.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  UserRegistrationObj:UserRegistration=new UserRegistration();
  public userData!: FormGroup;

  constructor(private toast:NgToastService, private api:ProductService, private userapi : UserService, private router:Router, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.userData=this.formBuilder.group({
      email:['', Validators.required],
      fname:['', Validators.required],
      lname:['', Validators.required],
      password:['', Validators.required]
    })
  }

  onSubmit(){
    this.UserRegistrationObj.email=this.userData.value.email;
    this.UserRegistrationObj.fname=this.userData.value.fname;
    this.UserRegistrationObj.lname=this.userData.value.lname;
    this.UserRegistrationObj.password=this.userData.value.password;

    console.log(this.UserRegistrationObj);
    this.userapi.registerUserFromRemote(this.UserRegistrationObj)
    .subscribe(data=>{
      console.log(data);
      this.toast.success({detail:"Sucess", summary:"You have registered successfully", duration:5000}) 
      let ref=document.getElementById('cancel')
      ref?.click();
      this.userData.reset(); 
      this.router.navigate(['/login']);
    },
      err=>{
        this.toast.error({detail:"Error Occoured", summary:"Something went wrong", duration:5000}) 
      });
  }

}
