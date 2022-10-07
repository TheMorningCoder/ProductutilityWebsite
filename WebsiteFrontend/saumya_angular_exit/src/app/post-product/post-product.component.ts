import { Component, OnInit } from '@angular/core';
import { ProductModel} from '../product-model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.css']
})

export class PostProductComponent implements OnInit {

  ProductModelObj: ProductModel=new ProductModel();
  public postProducts!: FormGroup;

  userEmail:string;  
  currentDate = new Date().toISOString();
  

  constructor(private toast:NgToastService, private api:ProductService, private router:Router, private formBuilder:FormBuilder) { }  

  ngOnInit(): void {
    this.userEmail=sessionStorage.getItem('email')
    this.postProducts=this.formBuilder.group({
      code:[0, Validators.required],
      name: ['', Validators.required],
      email:[this.userEmail],
      brand:['', Validators.required],
      category:['', Validators.required],
      color:['', Validators.required],
      price:[0, Validators.required],
    })
  }

  onSubmit(){
    this.ProductModelObj.code=this.postProducts.value.code;
    this.ProductModelObj.name=this.postProducts.value.name;
    this.ProductModelObj.category=this.postProducts.value.category;
    this.ProductModelObj.email=this.postProducts.value.email;
    this.ProductModelObj.brand=this.postProducts.value.brand;
    this.ProductModelObj.color=this.postProducts.value.color;
    this.ProductModelObj.price=this.postProducts.value.price;
    this.ProductModelObj.createdOn=this.currentDate;

    // console.log(this.ProductModelObj);
    this.api.postResult(this.ProductModelObj)
    .subscribe(data=>{
      console.log(data);
      this.toast.success({detail:"Sucess", summary:"Your Query Added Successfully", duration:5000}) 
      let ref=document.getElementById('cancel')
      ref?.click();
      this.postProducts.reset(); 
      this.router.navigate(['/result-page']);
    },
      err=>{
        this.toast.error({detail:"Error Occoured", summary:"Something went wrong", duration:5000}) 
      });
  }

}
