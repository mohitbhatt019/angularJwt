import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUsername:any="";
  constructor(private httpClient:HttpClient, private router:Router,private jwtHelterService:JwtHelperService) { }

  CheckUser(login:Login):Observable<any>{
    return this.httpClient.post<any>("https://localhost:44320/api/account/Authenticate",login).pipe(map(u=>{
      if(u){
        this.currentUsername=u.username;
        sessionStorage["currentUser"]=JSON.stringify(u);
      }
      else{
        return u;
      }
    }))

  }
  
  LogOut()
  {
    this.currentUsername="";
    sessionStorage.removeItem("currentUser");
    this.router.navigateByUrl("/login")
  }

  public isAuthenticated():boolean
  {
   if(this.jwtHelterService.isTokenExpired())
   {
    return false;
   }
   else
   {
    return true;
   }
  }
}
