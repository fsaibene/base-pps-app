import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { User } from '../model/user';
import { NavService } from '../services/nav.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {} as User;
  valid = new  BehaviorSubject<boolean>(false);
  selectedUser: string;
  constructor(
    private ns : NavService,
    public serviceLogged : AuthService,
    public toastCtrl: ToastController,
    private authAf : AngularFireAuth,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController  
  ) {
    
  }
  async login() {
    this.allFilled();
    if(this.valid.value){
      try {
        let loading = this.loadSpinner();
        loading.then(async loader =>{
          loader.present();
          await this.authAf.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
          .then(result => {
            this.serviceLogged.isLogged$.next(true);
            this.ns.setNavRoot(this.navCtrl);
            this.navCtrl.navigateRoot("/home")})
          .catch(error => {
            loading.then(l => l.dismiss());
            this.showToast(error.message);
          })
        });
        } catch (error) {
            if(error.code == "auth/argument-error"){
              var mailError = "Formato de mail incorrecto";
              console.log(mailError);
              this.showToast(mailError);
            }
        }
    } else {
      (await this.toastCtrl.create({ message: "Debe completar todos los campos", duration: 1500 })).present();
    }
  }

  async showToast(mensaje: string) {
    switch(mensaje)
    {
      case "The email address is badly formatted.":
      {
        mensaje = "El mail no es correcto";
        break;
      }
      case "The password is invalid or the user does not have a password.":
      {
        mensaje = "Clave incorrecta";
        break;
      }
      case "There is no user record corresponding to this identifier. The user may have been deleted.":
      {
        mensaje = "No existe un usuario con ese email.";
      }
    }
    (await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    })).present();
  }
  
  register(){
    this.navCtrl.navigateRoot("/register");
  }

  private allFilled(): void {
    this.valid.next(this.user.email != "" && this.user.password != "");
  }

  public isInvalid(): boolean{
    return (this.user.email == undefined || this.user.password == undefined || this.user.password == "" || this.user.email == "");
  }

  SeleccionarUsuario(){
    switch(this.selectedUser){
      case "admin":{
        this.user.email="admin@admin.com";
        this.user.password="111111";
        break;
      }
      case "usuario":{
        this.user.email="usuario@usuario.com";
        this.user.password="333333";
        break;
      }
      case "invitado":{
        this.user.email="invitado@invitado.com";
        this.user.password="222222";
        break;
      }                
      case "jugador1":{
        this.user.email="j1@jugador.com";
        this.user.password="444444";
        break;
      }
      case "jugador2":{
        this.user.email="j2@jugador.com";
        this.user.password="555555";
        break;
      }        
    }
  }
  private loadSpinner(): Promise<HTMLIonLoadingElement>
  {
    let loader = this.loadingCtrl.create({
      // dismissOnPageChange: true,
      spinner: 'bubbles',
      duration: 2500
    });
    return loader;
  }
}
