import { Component, OnInit } from '@angular/core';
import { ProductoServices } from '../../Servicios/producto.Services';

@Component({
  selector: 'filtrado-producto-categoria',
  templateUrl: './filtrado-producto-categoria.component.html',
  styles: []
})
export class FiltradoProductoCategoriaComponent implements OnInit {

  productos : any;
  constructor(private productoServices: ProductoServices) { }

  ngOnInit() {
  }

  buscar(categoria) {
    if (categoria.value == "") {
      this.productoServices.getProducto().subscribe(rsp => this.productos = rsp);
    } else {
      this.productoServices.getProductoPorCategoria(categoria.value).subscribe(resp => this.productos = resp);
    }
    
  }

  limpiar(categoria) {
    categoria.value = "";
    this.productoServices.getProducto().subscribe(rsp => this.productos = rsp);
  }
}
