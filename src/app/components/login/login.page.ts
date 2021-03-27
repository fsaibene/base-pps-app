import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { NavService } from 'src/app/services/nav.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  implements OnInit{
    public loginForm: FormGroup = new FormGroup({
        'email': new FormControl(null, Validators.required),
        'password': new FormControl(null, [
            Validators.required, Validators.minLength(6)]),
    });

    public needValidate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public needValidate$: Observable<boolean> = this.needValidate.asObservable();
    constructor(private ns : NavService,
    private toastService: ToastService,
    private auth : AuthService,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController) {

    }

    public ngOnInit(): void {
    }

    async login() {
        this.needValidate.next(true);
        if(this.loginForm.valid){
            try {
                let loading = this.loadSpinner();
                loading.then(async loader =>{
                    loader.present();
                    await this.auth.login(this.loginForm.controls["email"].value, this.loginForm.controls["password"].value)
                    .then(result => {
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
                    this.showToast(mailError);
                }
            }
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
    (await this.toastService.showToast(mensaje));
  }
  
  register(){
    this.navCtrl.navigateRoot("/register");
  }

  private loadSpinner(): Promise<HTMLIonLoadingElement>
  {
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 2500
    });
    return loader;
  }
}
