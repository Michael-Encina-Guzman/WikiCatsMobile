import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss'],
})
export class CargaComponent  implements OnInit {

  constructor(private loadingController: LoadingController) { }

  async presentLoading(message: string = 'Cargando...') {
    const loading = await this.loadingController.create({
      message: message,
      duration: 2000, // Duración de la pantalla de carga en milisegundos
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }

  ngOnInit() {}

}
