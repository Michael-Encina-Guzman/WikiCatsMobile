import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

  constructor(
    private modalController: ModalController,
    private emailComposer: EmailComposer 
  ) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  sendEmail() {
    const emailBody = `

        <h2> información principal del Gato Bosque De Noruega</h2>
        
        <h4> Comportamiento : Atento y Cariñoso</h4>

        <p>
          Proveniente de los frondosos bosques escandinavos nos encontramos a los gatos bosque de Noruega, cuyo aspecto recuerda al de un pequeño lince.
          Pero que este aspecto salvaje no nos engañe, estamos ante un gato increíblemente cariñoso y sociable, tanto es así que incluso hay tutores que los sacan de paseo.
          Su historia es increíble y fascinante, estando cargada de magia y misticismo vikingo. Es uno de los gatos que no temen al agua, siendo incluso un excelente pescador.
          Tampoco hay que dejarse engañar por su sólido físico, pues se trata de un animal sorprendentemente ágil que puede llegar a ser todo un acróbata digno de las piruetas más alucinantes.
        </p>

      </div>
    `;

    const email = {
      to: 'mi.encina@duocuc.cl', 
      subject: 'Información sobre Gato Bosque De Noruega',
      body: emailBody,
      isHtml: true,
    };

    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        this.emailComposer.open(email);
      } else {
        console.error('Email Composer no está disponible en este dispositivo');
      }
    }).catch(error => {
      console.error('Error al verificar disponibilidad de Email Composer', error);
    });
  }
}

