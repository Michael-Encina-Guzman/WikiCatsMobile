
/* Librerias */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';

/* Componentes */

import { ModalComponent } from './Components/modal/modal.component';

@NgModule({
  declarations: [AppComponent, ModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig )), 
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideFirebaseApp(() => initializeApp({
      "projectId" : "wikicatsmobilereforged",
      "appId" : "1:465509574582:web:18d829bbbba25be9960317",
      "storageBucket" : "wikicatsmobilereforged.appspot.com",
      "apiKey" : "AIzaSyD88NrzJaL1dM7x8NE55_XKL3VUJqNqCiE",
      "authDomain" : "wikicatsmobilereforged.firebaseapp.com",
      "messagingSenderId" : "465509574582",
      "measurementId" : "G-XMDLVX7SP0"}
    ))],
  bootstrap: [AppComponent],
})
export class AppModule {}
