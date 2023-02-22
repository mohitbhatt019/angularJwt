import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login:Login=new Login();
  loginErrorMessage:String=""
  constructor(private loginService:LoginService, private router:Router){}
  ngOnInit(): void {
  }

  LoginClick(){
    //alert(this.login.username)
    this.loginService.CheckUser(this.login).subscribe(
      (response)=>{
        this.router.navigateByUrl("/employee");
      },
    (error)=>{
      console.log(error);
      this.loginErrorMessage="Login Failed"
    }
    )
  }
}
