import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {}

  /* Cria um banco caso não exista ou pega um banco existente com o nome no parametro */
  public getDB() {
    return this.sqlite.create({
      name: 'carros.db',
      location: 'default'
    });
  }

  /* Cria a estrutura inicial do banco de dados */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        // Criando as tabelas
        this.createTables(db);
      })
      .catch(e => console.log(e));
  }

  /* Criando as tabelas no banco de dados */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS carro (id integer primary key, tipo TEXT, nome TEXT, desc TEXT, urlFoto TEXT, urlVideo TEXT, latitude TEXT, longitude TEXT)']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }
}