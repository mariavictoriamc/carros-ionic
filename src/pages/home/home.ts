import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, Slides } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetalhesPage } from '../detalhes/detalhes';
import { Platform } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { CadastroPage } from '../cadastro/cadastro';
import { CarroProvider } from '../../providers/carro/carro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;
  SwipedTabsIndicator: any = null;
  tabs: any = [];

  categoria: string = "classicos";
  isAndroid: boolean = false;

  public carros: Carro;
  public carrosClassicos = [];
  public carrosEsportivos = [];
  public carrosLuxo = [];
  public tipos = [];
  public carrosFavoritados: any[] = [];

  constructor(
      public navCtrl: NavController, 
      private _http: Http, 
      private _loadingCtrl: LoadingController,
      private _alertCtrl: AlertController,
      private platform: Platform,
      private carroProvider: CarroProvider) {
        this.isAndroid = platform.is('android');
        this.tabs=["Clássicos","Esportivos","Luxo","Favoritos"];
      }

  ngOnInit(){

    let loader = this._loadingCtrl.create({
      content: "Buscando novos carros. Aguarde ...",
    });
    loader.present();

    let all = this._http
      .get('http://livrowebservices.com.br/rest/carros')
      .map(res => res.json())
      .toPromise()
      .then(carros => {
        this.carros = carros;
        for(var i = 0; carros.length > i; i++){
          var carro = carros[i];
          let {tipo} = carro;
          if(this.tipos.find(tipoFromArray => tipoFromArray == tipo) == null){
            this.tipos.push(tipo);
          }
        }
        loader.dismiss().catch(() => {});
      })
      .catch(err => {
        console.log(err);
        loader.dismiss().catch(() => {});
        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            buttons: [{ text: 'Ok'}],
            subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde.'
          }).present();
      });

    let allClassicos = this._http
      .get('http://livrowebservices.com.br/rest/carros/tipo/classicos')
      .map(res => res.json())
      .toPromise()
      .then(carros => {
        this.carrosClassicos = carros;
        loader.dismiss().catch(() => {});
      })
      .catch(err => {
        console.log(err);
        loader.dismiss().catch(() => {});
        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            buttons: [{ text: 'Ok'}],
            subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde.'
          }).present();
      });

    let allEsportivos = this._http
      .get('http://livrowebservices.com.br/rest/carros/tipo/esportivos')
      .map(res => res.json())
      .toPromise()
      .then(carros => {
        this.carrosEsportivos = carros;
        loader.dismiss().catch(() => {});
      })
      .catch(err => {
        console.log(err);
        loader.dismiss().catch(() => {});
        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            buttons: [{ text: 'Ok'}],
            subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde.'
          }).present();
      });

    let allLuxo = this._http
      .get('http://livrowebservices.com.br/rest/carros/tipo/luxo')
      .map(res => res.json())
      .toPromise()
      .then(carros => {
        this.carrosLuxo = carros;
        loader.dismiss().catch(() => {});
      })
      .catch(err => {
        console.log(err);
        loader.dismiss().catch(() => {});
        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            buttons: [{ text: 'Ok'}],
            subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde.'
          }).present();
      });
      Promise.all([all, allClassicos, allEsportivos, allLuxo]).then(() => loader.dismiss());
  }

  ionViewDidEnter(){ 
    this.SwipedTabsIndicator = document.getElementById("indicator");

    let allFavoritos = this.carroProvider.getAll()
    .then((carros: any[]) => {
      this.carrosFavoritados = carros;
      //loader.dismiss().catch(() => {});
    });
    //Promise.all([allFavoritos]).then(() => loader.dismiss());
  }

  selectTab(index){    
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition(){
  	if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex()){
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
  	}   
  }

  animateIndicator($event){
  	if(this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
  }

  seleciona(carro){
    this.navCtrl.push(DetalhesPage, {carroSelecionado: carro});
  }

  cadastro(){
    this.navCtrl.push(CadastroPage);
  }
}