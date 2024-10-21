import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  authService = inject(AuthService)

  constructor() {}

  ngOnInit() : void {
    this.authService.user$.subscribe((user) => {
      if(user){
        this.authService.currentUserSig.set({
          email : user.email!,
          username : user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    })
  }

  logout() : void {
    console.log('logout')
  }

}
