import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoriaServicio {

  urlBase: string = "";
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.urlBase = baseUrl;
  }

  getCategoria() {
    return this.http.get(this.urlBase + 'api/Categoria/listarCategoria')
  }
}
