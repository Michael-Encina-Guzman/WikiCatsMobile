import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Declarar Modelo imputs
  login:any={
    usuario:"",
    password:"",
  }

  field:string="";

  Usuario = [
    {usuario : 'Mishi', password : '12345'} 
  ]
  constructor(
    private router:Router, public toastController:ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
  }

  async ingresar() {
    if (this.validarVacio(this.login)) {
      if (this.validarUsuario(this.login)) {
        // Mostrar pantalla de carga
        const loading = await this.loadingController.create({
          message: 'Cargando...',
          spinner: 'crescent'
        });
        await loading.present();
        setTimeout(async () => {
          this.presentToast("bottom", "Bienvenido a Wiki Cats");
          let navigationExtras: NavigationExtras = {
            state: { login: this.login }
          };
          await this.router.navigate(['/home'], navigationExtras);
          await loading.dismiss();
        }, 2000);
      } else {
        this.presentToast("bottom", "Usuario o contraseña incorrectos", 2000);
      }
    } else {
      this.presentToast("bottom", "Falta " + this.field, 2000);
    }
  }

  validarVacio(model:any){
    for(var [key,value] of Object.entries(model)){
      if(value == ""){
        this.field = key;
        return false;
      }
    }
    return true;
  }

  validarUsuario(login: any) {
    return this.Usuario.some(user => user.usuario === login.usuario && user.password === login.password);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg:string, duration?:number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration?duration:1500,
      position: 'bottom',
    });

    await toast.present();
  }
  }

