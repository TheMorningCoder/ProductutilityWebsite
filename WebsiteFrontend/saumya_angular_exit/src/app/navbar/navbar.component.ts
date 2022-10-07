import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  LoginStatus = new BehaviorSubject<boolean>(null);
  Username : Observable<string>;
  userEmail:string
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.userEmail=sessionStorage.getItem('email')
  }
  
  logout() {  
    console.log('logout');  
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('email');  
    this.router.navigate(['']);  
  }

}
