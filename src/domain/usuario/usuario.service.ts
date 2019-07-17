import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Usuario } from './usuario';

const KEY = 'avatarUrl';

@Injectable()
export class UsuarioService {

    private _usuarioLogado: Usuario;

    constructor(private _http: Http) {}

    public efetuaLogin(email: string, password: string) {

        let api = `https://aluracar.herokuapp.com/login?email=${email}&password=${password}`;
        // let api = 'http://atitude-server.livetouchdev.com.br/api/login';
        
        return this._http
            .get(api)
            .map(res => res.json().usuario)
            .toPromise()
            .then(dado => {
                let usuario = new Usuario(dado.nome, dado.data_nascimento, dado.email, dado.telefone, dado.token);
                this._usuarioLogado = usuario;
                return usuario;
            });
    }

    obtemUsuarioLogado() {
        return this._usuarioLogado;
    }

    guardaAvatar(url) {
        localStorage.setItem(KEY, url);
    }

    obtemAvatar() {
        return localStorage.getItem(KEY);
    }
}