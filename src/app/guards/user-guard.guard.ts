import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Components/Services/auth.service';
import { inject } from '@angular/core';

export const userGuardGuard: CanActivateFn = (route, state) => {
  var authService=inject(AuthService);
    var  router=inject(Router)
  
    console.log("in user gaurd",authService.isUser());
    
    if (authService.isUser()) {
      return true; // User is allowed access
    } else {
      router.navigate(['/login']);
      return false; // User is not allowed access
    }
  // return true;
};
