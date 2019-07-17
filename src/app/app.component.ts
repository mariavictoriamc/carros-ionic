import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { PerfilPage } from '../pages/perfil/perfil';
//import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
//import { UsuarioService } from '../domain/usuario/usuario.service';
//import { CadastroService } from '../pages/cadastro/cadastro.service';
import { ClassicosPage } from '../pages/classicos/classicos';
import { EsportivosPage } from '../pages/esportivos/esportivos';
import { LuxoPage } from '../pages/luxo/luxo';
import { FavoritosPage } from '../pages/favoritos/favoritos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // rootPage = LoginPage;
  rootPage: any = null;

  public paginas = [
    {titulo: 'Cadastro', componente: CadastroPage },
    {titulo: 'Perfil', componente: PerfilPage}
  ];

  @ViewChild(Nav) public nav: Nav;

  constructor(
    platform: Platform,
    public splashscreen: SplashScreen,
    dbProvider: DatabaseProvider,
    public statusBar: StatusBar) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashscreen.hide();

      //Criando o banco de dados
      dbProvider.createDatabase()
        .then(() => {
          // fechando a SplashScreen somente quando o banco for criado
          this.openHomePage(splashscreen);
        })
        .catch(() => {
          // ou se houver erro na criação do banco
          this.openHomePage(splashscreen); 
      });
    });
  }

  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = HomePage;
  }

  abrePagina(pagina) {
    this.nav.push(pagina.componente);
  }

  home(){
    this.nav.setRoot(HomePage);
  }

  classicos(){
    this.nav.push(ClassicosPage);
  }

  esportivos(){
    this.nav.push(EsportivosPage);
  }

  luxo(){
    this.nav.push(LuxoPage);
  }

  favoritos(){
    this.nav.push(FavoritosPage);
  }
}