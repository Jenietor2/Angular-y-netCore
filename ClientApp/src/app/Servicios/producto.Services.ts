import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductoServices {
  urlBase: string = "";
  url: string = 'api/producto/filtrarProductoNombre/';
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.urlBase = baseUrl;
  }
  public getProducto() {
    return this.http.get(this.urlBase+"api/producto/listarProductos");
  }
  //Filtro por nombre
  public getProductoPorNombre(nombre: string) {
    return this.http.get(this.urlBase + this.url + nombre);
  }
  //Filtrado por categoria
  public getProductoPorCategoria(idCategoria: number) {
    return this.http.get(this.urlBase + "api/producto/filtrarProductoCategoria/" + idCategoria);
  }
}
