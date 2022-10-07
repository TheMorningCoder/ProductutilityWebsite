import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ProductReview } from '../product-review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  url:string ="http://localhost:8182/review";
  url2:string="http://localhost:8182/filterreview"

  private msgSource = new Subject(); 

  current = this.msgSource.asObservable();

  constructor(private http: HttpClient) { }


  getReview(){
    return this.http.get<any>(`${this.url}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postReview(data:any){
    return this.http.post<any>(`${this.url}`, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateReview(data:any){
    let id=data.id
    let msg=data.message
    return this.http.put<any>("http://localhost:8182/editreview/"+id+"/"+msg, null)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateReview2(data:any, id:number){
    return this.http.put<any>("http://localhost:8182/updatereview/"+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteReview(id:any){
    return this.http.delete<any>("http://localhost:8182/deletereview/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getCommentByParentId(id:number):Observable<ProductReview>{
    return this.http.get<ProductReview>(`${this.url}/${id}`)
  }

  getCommentsById(id:number):Observable<ProductReview>{
    return this.http.get<ProductReview>(`${this.url}/${id}`)
  }

  getCommentsByPid2(pid:number):Observable<ProductReview[]>{
    return this.http.get<ProductReview[]>(`${this.url2}/${pid}`)
  }

// FIND()
  getCommentByPid(pid:number){
    return this.http.get(`${this.url2}?pid=${pid}`)
    .subscribe((res) =>{
      this.msgSource.next(res);
    })
  }

}
