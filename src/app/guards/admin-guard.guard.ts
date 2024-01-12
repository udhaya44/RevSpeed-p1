import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Components/Services/auth.service';
import { LoginComponent } from '../Components/login/login.component';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  // var authService=inject(AuthService);
  //   var  router=inject(Router)
  //   const loginComp=inject(LoginComponent)
  //   console.log("IN ADMIN GUARD",authService.isAdmin());
    
  
  //   if (authService.isAdmin()) {
  //     return true; // Admin is allowed access
  //   } else {
  //     router.navigate(['/login']);
  //     return false; // Admin is not allowed access/
  //   }
  return true
};
