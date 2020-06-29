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
  validarNombreUsuario(idUsuario, nombreUsuario) {
    return this.http.get(this.url + "api/usuario/ValidarUsuario/" + idUsuario+ "/" + nombreUsuario);
  }
  getUsuario(idUsuario) {
    return this.http.get(this.url + "api/usuario/EditarUsuarioPorId/" + idUsuario);
  }
  insertarUsuario(usuario) {
    return this.http.post(this.url + "api/usuario/InsertarUsuario", usuario);
  }
  eliminarUsuario(idUsuario) {
    return this.http.get(this.url + "api/usuario/EliminarUsuario/" + idUsuario);
  }
  login(usuario) {
    return this.http.post(this.url + "api/usuario/Login", usuario);
  }
  getSession() {
    return this.http.get(this.url + "api/usuario/GetSession");
  }
  cerrarSesion() {
    return this.http.get(this.url + "api/usuario/CerrarSesion");
  }
  listarPaginas() {
    return this.http.get(this.url + "api/usuario/ListarPagina");
  }
}
