import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetalhesPage } from '../detalhes/detalhes';

@Component({
    selector: 'page-classicos',
    templateUrl: 'classicos.html'
})

export class ClassicosPage implements OnInit{

    public carrosClassicos = [];
    
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
        Promise.all([allClassicos,]).then(() => loader.dismiss());
    }

    seleciona(carro){
        this.navCtrl.push(DetalhesPage, {carroSelecionado: carro});
    }
}

