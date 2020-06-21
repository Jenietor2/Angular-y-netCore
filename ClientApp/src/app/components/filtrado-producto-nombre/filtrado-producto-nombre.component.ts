import { Component, OnInit} from '@angular/core';
import { ProductoServices } from '../../Servicios/producto.Services';

@Component({
  selector: 'filtrado-producto-nombre',
  templateUrl: './filtrado-producto-nombre.component.html',
  styles: []
})
export class FiltradoProductoNombreComponent implements OnInit {

  productos: any;
  constructor(private productoService: ProductoServices) { }

  ngOnInit() {
  }
  filtrarDatos(nombre) {
    if (nombre == "") {
      this.productoService.getProducto().subscribe(data => this.productos = data);
    } else {
      this.productoService.getProductoPorNombre(nombre).subscribe(data => this.productos = data);
      //console.log(this.productoService.getProductoPorNombre(nombre.value));
    }
  }
  limpiar(nombre) {
    nombre.value = "";
    this.productoService.getProducto().subscribe(data => this.productos = data);
  }
}
