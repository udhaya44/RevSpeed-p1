import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(private http:HttpClient,private rout:Router) { }


  isAdminUser:any;
  isUserUser:any
  private isAuthenticated = false;
  

  isAuthenticatedUser(): boolean {
    
    return this.isAuthenticated
  }



  getToken(){
    return localStorage.getItem("token")
  }


  logOut(){
    localStorage.removeItem("token")
    
    return true
  }
  
  // This will authenticate user and return Jwt token 
  genrateToken({email,password}:any){
   return this.http.post("http://localhost:8081/user/login",{email,password})

  }


  // Add new user 
  public registerNewUser(user:any){
    
    return this.http.post("http://localhost:8081/user/create-user",user)

  }

  // getUserDetails(): Observable<any> {
  //   // Include the JWT token in the headers
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  //  console.log("this is header",headers);
  
  //   return this.http.get("http://localhost:8081/user/getAUser", { headers });
  // }

  thisIsAutherizesUser:any;
  isAdmin(): boolean {
    const isAutherize=localStorage.getItem("token")
    if(isAutherize){
      this.thisIsAutherizesUser=true
    }
    return  this.thisIsAutherizesUser && localStorage.getItem("userRole") === 'ADMIN';
  }
  
  isUser(): boolean {
    const isAutherize=localStorage.getItem("token")
    if(isAutherize){
      this.thisIsAutherizesUser=true
    }
    return this.thisIsAutherizesUser &&  localStorage.getItem("userRole")=== 'USER';
  }
  getUserDetails(): Observable<any>{
    return this.http.get("http://localhost:8081/user/getAUser", {
      headers: this.createAuhtorizationHeader() || {}
    })
  }

  private createAuhtorizationHeader() {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      console.log("JWT token found in session storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    } else {
      console.log("JWT token not found in session storage");
    }
    return null;
  }


 

  //businees broadband service request form 
  submitForm(formData: any): Observable<any> {
    return this.http.post("http://localhost:3000/formData", formData);
  }

  // rating
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/reviews")
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

  // Email 
  apiUrl="http://localhost:8081/email"
  sendEmailForRegisteration(email:String):Observable<any>{
    return this.http.post(`${this.apiUrl}/sendemail`, email);

  }

  sendPasswordResetEmail(email: string): Observable<any> {
    // Assuming your backend API has an endpoint to send a password reset email
    return this.http.post(`${this.apiUrl}/forgot-password`, email );
  }
}
