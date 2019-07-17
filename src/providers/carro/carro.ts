import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Carro } from '../../domain/carro/carro';
 
@Injectable()
export class CarroProvider {
 
  constructor(private dbProvider: DatabaseProvider) { }
 
  public insert(carro: Carro) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into carro (id, tipo, nome, desc, urlFoto, urlVideo, latitude, longitude) values (?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [carro.id, carro.tipo, carro.nome, carro.desc, carro.urlFoto, carro.urlVideo, carro.latitude, carro.longitude];
        return db.executeSql(sql, data)
            .then((db) => console.log('Inserido com Sucesso'))
            .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from carro where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from carro where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let carro = new Carro();
              carro.id = item.id;
              carro.tipo = item.tipo;
              carro.nome = item.nome;
              carro.desc = item.desc;
              carro.urlFoto = item.urlFoto;
              carro.urlVideo = item.urlVideo;
              carro.latitude = item.latitude;
              carro.longitude = item.longitude;
 
              return carro;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT * from carro order by id desc';     

      return db.executeSql(sql, null)
        .then((data: any) => {
          if (data.rows.length > 0) {
            let carros: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
                var carro = data.rows.item(i);
                carros.push(carro);
            }
            return carros;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
}