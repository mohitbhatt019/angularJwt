import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class ActiveguardService implements CanActivate {

  constructor(private loginService:LoginService,private router:Router,private jwtHelperService:JwtHelperService) { }
  
  canActivate(route:ActivatedRouteSnapshot):boolean
  {
    //  var token=sessionStorage.getItem('currentUser')?JSON.parse(sessionStorage.getItem
    //    ('currentUser') as string).token:null;

    if(this.loginService.isAuthenticated())
    {
      return true;
    }
    else
    {
      this.router.navigateByUrl("/login");
      return false
    }
  }
}
