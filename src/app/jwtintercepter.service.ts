import { HttpInterceptor,HttpEvent,HttpHandler,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class JwtintercepterService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     //JWT
     var currentUser={token:""};
     var currentUserSession=sessionStorage.getItem("currentUser");
     if(currentUserSession!=null){
       currentUser=JSON.parse(currentUserSession);
      //  headers=headers.set("Authorization","Bearer "+ currentUser.token);
     } 
     req=req.clone({
      setHeaders:{
        Authorization:"Bearer " + currentUser.token
      }
     })
     return next.handle(req)
  }
}
