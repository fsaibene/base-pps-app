import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private  authService:  AngularFireAuth, private  router: Router) { }

  ngOnInit() {
  }

  register(form) {
    //TODO: Implementar
    // this.authService.auth.createUserWithEmailAndPassword(form.value).subscribe((res) => {
    //   this.router.navigateByUrl('home');
    // });
  }
}
