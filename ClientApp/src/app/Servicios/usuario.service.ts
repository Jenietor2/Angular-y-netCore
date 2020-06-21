import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsuarioService {
  url: string;
  constructor(private http: HttpClient, @Inject("BASE_URL") urlBase: string) {
    this.url = urlBase;
  }
  getUsuarios() {
    return this.http.get(this.url + "api/Usuario/ListarUsuarios");
  }
  getTipoUsuario() {
    return this.http.get(this.url + "api/Usuario/ListarTiposUsuarios");
  }
  getUsuariosXTipo(idTipoUsuario: number) {
    return this.http.get(this.url + "api/usuario/FiltrarUsuarioXTipo/" + idTipoUsuario);
  }
}
