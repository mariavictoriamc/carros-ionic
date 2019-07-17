import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps';
import { CarroProvider } from '../../providers/carro/carro';

declare var google; 

@Component({
    selector: 'page-detalhes',
    templateUrl: 'detalhes.html'
})

export class DetalhesPage{
    @ViewChild('map') mapElement: ElementRef;
    map: GoogleMap;

    public carro: Carro;

    pdfurl: string;

    constructor(
        public navParams: NavParams, 
        private _googleMaps: GoogleMaps, 
        private carroProvider: CarroProvider,
        private _alertCtrl: AlertController){
            this.carro = navParams.get('carroSelecionado');
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap(){
        let latLng = new google.maps.LatLng(this.carro.latitude, this.carro.longitude);
     
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
     
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);    
    }

    addFavorito(carro){
        let {id} = carro;
        let b1 = document.getElementById("btnMudaCor");
        let carroDb = this.carroProvider.get(id)
        .then((carroDb) => {
            if(carroDb != null && carroDb != undefined){
                b1.style.background = "dark"; 
                this.carroProvider.remove(id); 
                this._alertCtrl.create({
                    title: 'Aviso',
                    subTitle: 'Carro removido dos favoritos!',
                    buttons: [{ text: 'Ok'}]
                }).present();
            }
            else{
                b1.style.background = "red"; 
                this.carroProvider.insert(carro);
                this._alertCtrl.create({
                    title: 'Aviso',
                    subTitle: 'Carro adicionado aos favoritos!',
                    buttons: [{ text: 'Ok'}]
                }).present();
            } 
        })
        .catch((err) => console.log(err));
    }
}