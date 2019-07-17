import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Http } from '@angular/http';
import { Carro } from '../../domain/carro/carro';
import { HomePage } from '../home/home';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  private _alerta: Alert;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _http: Http,
    private _alertCtrl: AlertController,
    public vibration: Vibration) {

      this.carro = new Carro();

      this._alerta =  this._alertCtrl.create({
        title: 'Aviso',
        buttons: [{ text: 'OK', handler: () => {navCtrl.setRoot(HomePage)} }]
      });
  }

  salva(){

    if(!this.carro.tipo || !this.carro.nome || !this.carro.desc){

      this.vibration.vibrate(500);

      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Você deve preencher todas as informações',
        buttons: [{ text: 'Ok'}]
      }).present();

      return;
    }

    let api = `http://livrowebservices.com.br/rest/carros?tipo=${this.carro.tipo}&nome=${this.carro.nome}&desc=${this.carro.desc}`;

    this._http
        .get(api)
        .toPromise()
        .then(() => {
          this._alerta.setSubTitle('Carro cadastrado com sucesso!');
          this._alerta.present();
        })
        .catch(err => {
          console.log(err);
          this._alerta.setSubTitle('Não foi possível cadastrar o carro. Tente novamente mais tarde.');
          this._alerta.present();
        });
  }
}
