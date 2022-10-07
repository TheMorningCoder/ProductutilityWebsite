import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '../product-model';
import { ProductService } from '../shared/product.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserRegistration } from '../user-registration';
import { faBox, faFileContract, faGlobe } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  product: ProductModel=new ProductModel();
  products: ProductModel[]=[];
  users: UserRegistration[]=[];

  globeIcon = faGlobe;
  productIcon = faBox;
  reviewIcon = faFileContract;

  formGroup!:FormGroup

  subs:any = Subscription;
  filterQuestions: any = [];

  results:boolean=false

  findQuestions = new FormGroup({
    query: new FormControl('')
  })

  constructor(private api:ProductService, private router:Router, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.findQuestions=this.formbuilder.group({
      query:['', Validators.required]
    })

    this.results=false
    this.subs = this.api.current.subscribe((result)=>{
      this.filterQuestions=result;
      this.results=true;
    });

// Get All Questions
    this.api.getResult()
    .subscribe(data=>{
      this.products=data;

    })

    // Get All Register User
    this.api.getUser()
    .subscribe(data=>{
      this.users=data;
    })


  }

  viewDetails(id: number){
    this.router.navigate(['question-details', id])
  }

  searchResult(){
    this.api.find(this.findQuestions.value);
  }

}
