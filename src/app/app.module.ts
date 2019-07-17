import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DetalhesPage } from '../pages/detalhes/detalhes';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuarioService } from '../domain/usuario/usuario.service';
//import { Storage } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ClassicosPage } from '../pages/classicos/classicos';
import { EsportivosPage } from '../pages/esportivos/esportivos';
import { LuxoPage } from '../pages/luxo/luxo';
import { FavoritosPage } from '../pages/favoritos/favoritos';

// Recursos nativos
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Vibration } from '@ionic-native/vibration'; 
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';

// Banco de dados
import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database/database';
import { CarroProvider } from '../providers/carro/carro';

/*function provideStorage() {
  return new Storage({ 
    name: 'carros',
    storeName: 'cadastro'
  });
}*/

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetalhesPage,
    CadastroPage,
    LoginPage,
    PerfilPage,
    ClassicosPage,
    EsportivosPage,
    LuxoPage,
    FavoritosPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetalhesPage,
    CadastroPage,
    LoginPage,
    PerfilPage,
    ClassicosPage,
    EsportivosPage,
    LuxoPage,
    FavoritosPage
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    { provide: ErrorHandler, useClass: IonicErrorHandler }, 
    UsuarioService,
    //{ provide: Storage, useFactory: provideStorage },   
    SplashScreen,
    StatusBar,
    Vibration,
    Camera,
    GoogleMaps,
    SQLite,
    DatabaseProvider,
    CarroProvider,
    DatabaseProvider
  ]
})
export class AppModule {}