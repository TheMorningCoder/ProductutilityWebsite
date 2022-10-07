import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductModel } from '../product-model';
import { UserRegistration } from '../user-registration'

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  baseUrl:string ="http://localhost:8182/products";

  urlQsn:string ="http://localhost:8182/products";

  urlSearch:string ="http://localhost:8182/search";

  urlAllUsers:string ="http://localhost:8182/allusers";

  private msgSource = new Subject();  
  
  current = this.msgSource.asObservable();

  constructor(private http: HttpClient) { }

  getResult(){
    return this.http.get<any>(`${this.urlQsn}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postResult(data:any){
    console.log(data.category);
    return this.http.post<any>(`${this.urlQsn}`, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getQuestionById(id:number):Observable<ProductModel>{
    return this.http.get<ProductModel>(`${this.urlQsn}/${id}`)
  }

  find(data:{query:string}){
    return this.http.get(`${this.urlSearch}?query=${data.query}`)
    .subscribe((res) =>{ 
      this.msgSource.next(res); 
    })
  }

  getUser(){
    return this.http.get<any>(`${this.urlAllUsers}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


}
