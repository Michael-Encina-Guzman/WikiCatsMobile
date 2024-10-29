import { Component, OnInit } from '@angular/core';
import { CatService } from 'src/app/Services/cat.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/Interfaces/user.interface';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  catImages: string[] = [];
  fetchedImages: Set<string> = new Set(); 
  maxImages: number = 4; 
  capturedImage: string | undefined;

  constructor(private catService: CatService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.fetchCatImages();
  }

  fetchCatImages() {
    this.catService.getCatImages().subscribe(
      (data) => {
        data.forEach(cat => {
          if (!this.fetchedImages.has(cat.url)) {
            this.fetchedImages.add(cat.url);
            this.catImages.push(cat.url);
          }
        });

        if (this.catImages.length < 4 && this.catImages.length < this.maxImages) {
          this.fetchCatImages();
        }
      },
      (error) => {
        console.error('Error fetching cat images:', error);
      }
    );
  }

  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera 
    });

    this.capturedImage = image.dataUrl;
  }

  // Navegación

  Home(){
    this.router.navigate(['/home'])
  }

  Profile(){
    this.router.navigate(['/profile'])
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
