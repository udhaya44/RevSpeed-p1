import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  [x: string]: any;
  private readonly baseUrl = 'http://34.42.204.62'
  
  
  
  // private readonly baseUrl = 'http://localhost:8081'

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
   return this.http.post(`${this.baseUrl}/user/login`,{email,password})

  }


  // Add new user 
  public registerNewUser(user:any){
    
    return this.http.post(`${this.baseUrl}/user/create-user`,user)

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
    return this.http.get(`${this.baseUrl}/user/getAUser`, {
      headers: this.createAuhtorizationHeader() || {}
    })
  }

  public createAuhtorizationHeader() {
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
  apiUrl=`${this.baseUrl}/email`;
  sendEmailForRegisteration(email:String):Observable<any>{
    return this.http.post(`${this.apiUrl}/sendemail`, email);

  }

  sendotp(email: string): Observable<any> {
    console.log("ggggggggggggggg",email);
    
    return this.http.post(`${this.baseUrl}/user/send-otp/${email}`,'');
  }

  // is email present
  isEmailPresent(mail:any){
    return this.http.get(`${this.baseUrl}/user/isEmailPresent/${mail}`);
  }

  updatePassword(email:any,newpassword:any){
   return  this.http.put(`${this.baseUrl}/email/updatePassword/${email}/${newpassword}`,'')
  }

  getPlans(){return this.http.get("http://localhost:3000/plans")}


  updateUserProfile(id:any,User :any){
    return this.http.put(`${this.baseUrl}/user/updateUserDetails/${id}`,User);
  }

  getUserAllPlansDetaiils(id:any){
    return this.http.get(`${this.baseUrl}/userservicelink/getUserServicesDetails/${id}`);
  }

  getAllBroadbandplans(){
    return this.http.get(`${this.baseUrl}/broadbandplans/getAllplans`);
  }

  purchesBroadbandPlan(data:any){
    return this.http.post(`${this.baseUrl}/userservicelink/linkuserservice`,data);

  }

  getAllBusinessPlans(){
    return this.http.get(`${this.baseUrl}/businessplans/getAllBusinessPlan`);
  }

deleteUserById(id:any){
  return this.http.delete(`${this.baseUrl}/user/deleteUser/${id}`);
}

// updatePasswordAfterLogin(id:String,password:String){
//   console.log("indide passwordafter login ",id,password)
//   return this.http.put(`http://localhost:8081/user/updatePasswordAfterLogin/${id}`, password);
// }

updatePasswordAfterLogin(id: string, password: string): Observable<string> {
  const url = `${this.baseUrl}/user/updatePasswordAfterLogin/${id}/${password}`;


  return this.http.put<string>(url,'');
}

}
