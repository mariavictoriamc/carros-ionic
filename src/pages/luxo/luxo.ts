import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetalhesPage } from '../detalhes/detalhes';

@Component({
    selector: 'page-luxo',
    templateUrl: 'luxo.html'
})

export class LuxoPage implements OnInit{

    public carrosLuxo = [];
    
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
        Promise.all([allLuxo]).then(() => loader.dismiss());
    }

    seleciona(carro){
        this.navCtrl.push(DetalhesPage, {carroSelecionado: carro});
    }
}