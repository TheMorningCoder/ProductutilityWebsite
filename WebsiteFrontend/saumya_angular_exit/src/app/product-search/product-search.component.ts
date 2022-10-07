import { Component, OnInit } from '@angular/core';
import { ProductModel} from '../product-model';
import { ProductService} from '../shared/product.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})

export class ProductSearchComponent implements OnInit {

  formGroup!:FormGroup
  results:boolean=false;
  subs:any = Subscription;
  filterProducts: any = [];

  findProducts = new FormGroup({
    query: new FormControl('')
  })

  constructor(private api:ProductService, private router:Router, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    
    this.results=false
    this.subs = this.api.current.subscribe((result)=>{
      this.filterProducts=result;
      this.results=true
    });

    this.findProducts=this.formbuilder.group({
      query:['', Validators.required]
    })

  }

  viewDetails(id: number){
    this.router.navigate(['product-details', id])
  }

  searchResult(){
    this.api.find(this.findProducts.value);
  }

}
