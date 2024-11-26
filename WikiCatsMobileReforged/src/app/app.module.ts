/* Librerías */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { environment } from 'src/environments/environment.prod'; // Asegúrate de usar el archivo correcto
import { HttpClientModule } from '@angular/common/http';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

/* Componentes */
import { ModalComponent } from './Components/modal/modal.component';

@NgModule({
  declarations: [AppComponent, ModalComponent],
  
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ReactiveFormsModule,
    FormsModule,  
    HttpClientModule
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EmailComposer,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), 
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), 
    provideStorage(() => getStorage())
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

