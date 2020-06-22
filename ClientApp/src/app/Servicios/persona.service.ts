import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class PersonaService {
  urlBase: string;
  constructor(private http: HttpClient, @Inject("BASE_URL") url: string) {
    this.urlBase = url;
  }

  getPersona() {
    return this.http.get(this.urlBase + "api/persona/Listadopersonas");
  }
  getPersonaFiltrada(nombre: string) {
    return this.http.get(this.urlBase + "api/persona/FiltradoPersona/" + nombre);
  }
  insertPersona(persona) {
    return this.http.post(this.urlBase + "api/persona/GuardarPersona", persona);
  }
  editarPersona(idPersona: number) {
    return this.http.get(this.urlBase + "api/persona/EditarPersona/" + idPersona);
  }
  eliminarPersona(idPersona) {
    return this.http.get(this.urlBase + "api/persona/EliminarPersona/" + idPersona);
  }
  validarCorreo(idPersona: number, correo: string) {
    return this.http.get(this.urlBase + "api/persona/ValidarEmail/" + idPersona + "/" + correo);
  }
  getPersonasSinUsuario() {
    return this.http.get(this.urlBase + "api/persona/ListarPersonasSinUsuario");
  }
}
