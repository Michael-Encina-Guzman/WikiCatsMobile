import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular'; // Importar LoadingController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  isLoading = false; // Variable para el estado del loader
  showToast = false; // Variable para el estado del toast

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,      
    private authService: AuthService, 
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController // Inyección del LoadingController
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();
      this.isLoading = true; // Mostrar el loader

      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
      });
      await loading.present();

      this.authService.login(rawForm.email, rawForm.password).subscribe(
        async () => {
          await loading.dismiss(); 
          this.router.navigateByUrl('/home');
        },
        async (error) => {
          await loading.dismiss();
          this.presentToast('bottom', 'Usuario o contraseña incorrectos', 3000);
        }
      );
    } else {
      this.presentToast('bottom', 'Por favor, completa todos los campos correctamente', 3000);
    }
  }

  Registro() {
    this.router.navigate(['/registro']);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg: string, duration: number = 3000) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      position: position,
      color: 'dark',
    });
    await toast.present();
  }
}
