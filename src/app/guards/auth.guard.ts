import { Inject, Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../Components/Services/auth.service';



export const authGuard: CanActivateFn = (route, state) => {
 

  // var authService=inject(AuthService);
//   var  router=inject(Router)

//   // var logintrue= authService.isLoggedIn();
//   const expectedRole = route.data['expectedRole'];
//   console.log("rout",expectedRole);
  
//   console.log("excpected role",localStorage.getItem("userRole"));
//   // console.log("is authenticay=ted",authService.isAuthenticatedUser());
  

//  if (0) {
//   // Redirect to login or unauthorized page
//   router.navigate(['/login']);
//   return false;
// }

return true;
};


