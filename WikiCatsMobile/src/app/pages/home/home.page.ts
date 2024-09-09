import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  GatoNoruego = false;
  Rusoazul = false;
  GatoCeilan = false;
  GatoSokoke = false;
  
  setOpen(modalType: string, isOpen: boolean) {
    if (modalType === 'GatoNoruego') {
      this.GatoNoruego = isOpen;
    } else if (modalType === 'Rusoazul') {
      this.Rusoazul = isOpen;
    } else if (modalType === 'GatoCeilan') {
      this.GatoCeilan = isOpen;
    } else if (modalType === 'GatoSokoke') {
      this.GatoSokoke = isOpen;
    } 
  }

  login:any;
  constructor(public alertController:AlertController,
              private activatedRoute: ActivatedRoute,
              private router : Router) {
    //recibo el parámetro y lo asigno a una variable que pueda recibir el valor
    this.activatedRoute.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.login = this.router.getCurrentNavigation()?.extras?.state?.['login']; 
        console.log(this.login);
      }
    });
  }

  Salir(){
      let navigationExtras : NavigationExtras ={
        state: {login : this.login}
      };
      this.router.navigate(['/login'],navigationExtras);
    }
}
