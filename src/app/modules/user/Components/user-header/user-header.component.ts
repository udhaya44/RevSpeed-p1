import { Component } from '@angular/core';
import { AuthService } from '../../../../Components/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss'
})
export class UserHeaderComponent {

  constructor(private authservice:AuthService,private router:Router){}

  logOut(){
    this.authservice.logOut();
     this.router.navigate(['/login'])

  }

}
