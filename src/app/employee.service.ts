import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Employee } from './employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient) { }


  getAllEmployees():Observable<any>{

    // //JWT
    // var currentUser={token:""};
    // //var headers=new HttpHeaders();
    // headers=headers.set("Authorization","Bearer ");
    // var currentUserSession=sessionStorage.getItem("currentUser");
    // if(currentUserSession!=null){
    //   currentUser=JSON.parse(currentUserSession);
    //   headers=headers.set("Authorization","Bearer "+ currentUser.token);
    // }
    // return this.httpClient.get<any> ("https://localhost:44320/api/employee",{headers:headers});

  return this.httpClient.get<any> ("https://localhost:44320/api/employee");
  }

  saveEmployee(newEmployee:Employee):Observable<Employee>{
  //  //JWT
  //   var currentUser={token:""};
  //   var headers=new HttpHeaders();
  //   headers=headers.set("Authorization","Bearer ");
  //   var currentUserSession=sessionStorage.getItem("currentUser");
  //   if(currentUserSession!=null){
  //     currentUser=JSON.parse(currentUserSession);
  //     headers=headers.set("Authorization","Bearer "+ currentUser.token);
  //   }
  //   return this.httpClient.post<Employee>("https://localhost:44320/api/employee",newEmployee,{headers:headers})

    return this.httpClient.post<Employee>("https://localhost:44320/api/employee",newEmployee)
  }

  updateEmployee(editEmployee:Employee):Observable<Employee>{
    // //JWT
    // var currentUser={token:""};
    // var headers=new HttpHeaders();
    // headers=headers.set("Authorization","Bearer ");
    // var currentUserSession=sessionStorage.getItem("currentUser");
    // if(currentUserSession!=null){
    //   currentUser=JSON.parse(currentUserSession);
    //   headers=headers.set("Authorization","Bearer "+ currentUser.token);
    // }
    // return this.httpClient.put<Employee>("https://localhost:44320/api/employee",editEmployee,{headers:headers})

    return this.httpClient.put<Employee>("https://localhost:44320/api/employee",editEmployee)
  }

  deleteEmployee(id:number):Observable<any>{
  //   //JWT
  //   var currentUser={token:""};
  //   var headers=new HttpHeaders();
  //  // headers=headers.set("Authorization","Bearer ");
  //   var currentUserSession=sessionStorage.getItem("currentUser");
  //   if(currentUserSession!=null){
  //     currentUser=JSON.parse(currentUserSession);
  //     headers=headers.set("Authorization","Bearer "+ currentUser.token);
  //   }
  // return this.httpClient.delete<any>("https://localhost:44320/api/employee/"+ id,{headers:headers});

    return this.httpClient.delete<any>("https://localhost:44320/api/employee/"+ id );
  }
}
