import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductModel } from '../product-model';
import { ProductService } from '../shared/product.service';
import { ReviewService } from '../shared/review.service';
import { ProductReview } from '../product-review';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  code:number
  productDate:Date
  product: ProductModel=new ProductModel();
  userCommentObj:ProductReview=new ProductReview();
  comments:ProductReview[]=[];

  filterComments: any = [];

  selected:number = 0;
  hovered:number = 0;

  showAdd !: boolean
  showUpdate !: boolean

  commentForm:FormGroup;
  sessionEmail:string;
  userEmail:string
  productName:string

  constructor(private toast:NgToastService, private reviewApi:ReviewService ,private api:ProductService, private router:ActivatedRoute, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.sessionEmail=sessionStorage.getItem('email')

    this.code=this.router.snapshot.params['id']
// Fetching questions by id----
    this.getQuestionsById();
    // this.getAllComment();
    this.getCommentPid();



// Insert Comment into database
    this.commentForm=this.formBuilder.group({
      productName:[this.product.name],
      email:[this.sessionEmail],
      message:['', Validators.required],
    })
  }

  getAllComment(){
    this.reviewApi.getReview()
    .subscribe(data=>{
      this.comments=data;
    })
  }

  getQuestionsById(){
    this.code=this.router.snapshot.params['id']
    this.api.getQuestionById(this.code)
    .subscribe(data=>{
      console.log(data);
      this.product=data;
      this.userEmail=this.product.email;
      this.productName=this.product.name;
    },err=>console.log(err));
  }

  getCommentPid(){
    this.code=this.router.snapshot.params['id']
    this.reviewApi.getCommentsByPid2(this.code)
    .subscribe(data=>{
      console.log(data);
      this.comments=data;
    },err=>console.log(err));
  }

  onSubmitCommentForm(){

    this.userCommentObj.productId=this.product.code;
    this.userCommentObj.email=this.commentForm.value.email;
    this.userCommentObj.rating=this.selected;
    this.userCommentObj.message=this.commentForm.value.message;

    // console.log(this.userCommentObj);
    this.reviewApi.postReview(this.userCommentObj)
    .subscribe(data=>{
      this.toast.success({detail:"Success", summary:"Comment added successfully", duration:3000 })
      let ref=document.getElementById('cancel')
      ref?.click();
      this.selected = 0;
      this.commentForm.reset();
      this.getAllComment();
      // this.getCommentPid();
      // this.router.navigate(['/result-page']);
    },
      err=>{
        this.toast.error({detail:"Error Occoured", summary:"Something went wrong", duration:3000})
      })
  }


// ----------------comment works------------------

deleteCommentResult(com:any){
  console.log("deleteCommentResult clicked....");
  this.reviewApi.deleteReview(com.id)
  .subscribe(res=>{
    this.toast.warning({detail:"Success", summary:"Comment deleted successfully", duration:3000 })
    this.getCommentPid()
  },err=>{
    this.toast.error({detail:"Error Occoured", summary:"Something went wrong", duration:3000})
  })
}

onEdit(com:any){
  this.showAdd=false;
  this.showUpdate=true;
  this.userCommentObj.id=com.id
  // this.commentForm.controls['parentid'].setValue(com.parentid);
  // this.commentForm.controls['email'].setValue(com.email);
  this.selected=com.rating;
  this.api.getQuestionById(com.productId).subscribe(prod=>{
    this.code = prod.code;
    this.productName = prod.name;
    this.userEmail = prod.email;
  },err=>{});
  this.commentForm.controls['message'].setValue(com.message);
}

updateCommentResult(){
  this.userCommentObj.productId=this.commentForm.value.parentid;
  this.userCommentObj.email=this.commentForm.value.email;
  this.userCommentObj.message=this.commentForm.value.message;

  this.reviewApi.updateReview(this.userCommentObj)
  .subscribe(res=>{
    this.toast.success({detail:"Success", summary:"Comment updated successfully", duration:3000 })
    let ref=document.getElementById('cancel')
    ref?.click();
    this.commentForm.reset();
    this.getCommentPid();
  },err=>{
    this.toast.error({detail:"Error Occoured", summary:"Something went wrong", duration:3000 })
  })
}

clickAddComment(){
  // this.commentForm.reset();
  this.code=this.product.code;
  this.userEmail=this.product.email;
  this.productName=this.product.name;
  this.selected=0;
  this.commentForm.controls['message'].setValue('');
  this.showAdd=true;
  this.showUpdate=false;
}

onCancel() {
  this.selected=0;
}

reloadCurrentPage() {
  window.location.reload();
 }

}
