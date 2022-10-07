import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '../user-registration';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlUsers="http://localhost:8182/users"
  

  constructor(private http: HttpClient) { }

  
  public loginUserFromRemote(user :UserRegistration):Observable<any>{
    return this.http.post<any>("http://localhost:8182/login",user)
 
   }
 
   public registerUserFromRemote(user :UserRegistration):Observable<any>{
     return this.http.post<any>("http://localhost:8182/users",user)
   }

  //  postUsers(data:any){
  //   return this.http.post<any>("http://localhost:8182/users", data)
  //   .pipe(map((res:any)=>{
  //     return res;
  //   }))
  // }



}
