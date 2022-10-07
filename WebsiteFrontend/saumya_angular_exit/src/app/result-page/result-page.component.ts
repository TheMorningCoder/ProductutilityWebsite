import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { EventEmitter } from 'stream';
import { ProductModel } from '../product-model';
import { ProductService } from '../shared/product.service';


@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  products: ProductModel[];

  questions:ProductModel[] = [];

  filterString:string

  constructor(private formBulder:FormBuilder, private api:ProductService, private router:Router) { }

  ngOnInit(): void {

    // this.api.getQuestions().subscribe(response=>{
    //   this.questions=response;
    // })


    this.getCommunityQuestions();
  }



  getCommunityQuestions(){
    this.api.getResult()
    .subscribe(data=>{
      this.products=data;
    })
  }

  viewDetails(id: number){
    this.router.navigate(['question-details', id])
  }

}
