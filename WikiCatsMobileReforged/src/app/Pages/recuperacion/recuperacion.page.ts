import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastController } from '@ionic/angular'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {
  email: string = ''; 

  constructor(
    private authService: AuthService, 
    private toastController: ToastController,
    private router: Router 
  ) {}

  ngOnInit() {}

  async sendPasswordResetEmail() {
    if (!this.email) {
      this.showToast('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    this.authService.resetPassword(this.email).subscribe({
      next: async () => {
        this.showToast('Correo de recuperación enviado. Revisa tu bandeja de entrada.');
      },
      error: async (error) => {
        // Maneja errores específicos
        if (error.code === 'auth/user-not-found') {
          this.showToast('El correo electrónico ingresado no está registrado.');
        } else {
          this.showToast('Error al enviar el correo de recuperación.');
        }
        console.error(error);
      },
    });
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  Volver() {
    this.router.navigate(['/login']);
  }
}


