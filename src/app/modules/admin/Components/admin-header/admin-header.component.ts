import { Component } from '@angular/core';
import { AuthService } from '../../../../Components/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

  constructor(private authservice:AuthService,private router:Router){}

  logOut(){
    this.authservice.logOut();
     this.router.navigate(['/login'])

  }
}
