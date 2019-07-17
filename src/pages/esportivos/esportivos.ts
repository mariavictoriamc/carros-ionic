import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetalhesPage } from '../detalhes/detalhes';

@Component({
    selector: 'page-esportivos',
    templateUrl: 'esportivos.html'
})

export class EsportivosPage implements OnInit{

    public carrosEsportivos = [];
    
    constructor(
        public navCtrl: NavController,
        private _alertCtrl: AlertController,
        private _http: Http,
        private _loadingCtrl: LoadingController,){}
    
    ngOnInit(){

        let loader = this._loadingCtrl.create({
            content: "Buscando novos carros. Aguarde ...",
          });
          loader.present();

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
        Promise.all([allEsportivos,]).then(() => loader.dismiss());
    }

    seleciona(carro){
        this.navCtrl.push(DetalhesPage, {carroSelecionado: carro});
    }
}