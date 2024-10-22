import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/Components/modal/modal.component';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/Interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  currentUser: UserInterface | null | undefined;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
      if (!this.currentUser) {
        this.router.navigate(['/login']); 
      }
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
    });
    return await modal.present();
  }

  Profile(){
    this.router.navigate(['/profile'])
  }

  Foro(){
    this.router.navigate(['/forum'])
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']); 
      },
      error: (err) => console.error('Logout error', err),
    });
  }
}


