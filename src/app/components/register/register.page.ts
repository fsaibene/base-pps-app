import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    public password: string = "";
    public email: string = "";
  constructor(private auth:  AuthService, private  router: Router) { }

  ngOnInit() {
  }

  public register():void{
    this.auth.signUp(this.email, this.password).then(() => {
      console.log("Usuario creado!")
      // this.router.navigate(['login']);
    })
  }
}
