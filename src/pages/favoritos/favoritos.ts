import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { DetalhesPage } from '../detalhes/detalhes';
import { CarroProvider } from '../../providers/carro/carro';

@Component({
    selector: 'page-favoritos',
    templateUrl: 'favoritos.html'
})

export class FavoritosPage{

    public carrosFavoritados: any[] = [];

    constructor(
        public navCtrl: NavController,
        private _alertCtrl: AlertController,
        private _loadingCtrl: LoadingController,
        private carroProvider: CarroProvider){}

    
    ionViewDidEnter(){

        let loader = this._loadingCtrl.create({
            content: "Buscando novos carros. Aguarde ...",
        });
        loader.present();
    
        let allFavoritos = this.carroProvider.getAll()
            .then((carros: any[]) => {
            this.carrosFavoritados = carros;
            loader.dismiss().catch(() => {});
        });
        Promise.all([allFavoritos]).then(() => loader.dismiss());
    }

    seleciona(carro){
        this.navCtrl.push(DetalhesPage, {carroSelecionado: carro});
    }
}