import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from 'express';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
  
})
export class HeaderComponent {
  
 constructor(private auth:AuthService){}

  isLogedIn=localStorage.getItem("token");

  logOut(){
    this.auth.logOut();
  }
}
