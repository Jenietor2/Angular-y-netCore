import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriaServicio } from '../../Servicios/categoria.servicio.service';

@Component({
  selector: 'buscador-producto-categoria',
  templateUrl: './buscador-producto-categoria.component.html',
  styles: []
})
export class BuscadorProductoCategoriaComponent implements OnInit {

  @Output() clickBuscar: EventEmitter<any>;
  @Output() clickLimpiar: EventEmitter<any>;

  categorias: any;
  constructor(private categoriaServices: CategoriaServicio) {
    this.clickBuscar = new EventEmitter();
    this.clickLimpiar = new EventEmitter();
  }

  ngOnInit() {
    this.categoriaServices.getCategoria().subscribe(data => {
      this.categorias = data
      console.log(this.categorias);});
    
  }

  buscar(categoria) {
    this.clickBuscar.emit(categoria);
  }

  limpiar(categoria) {
    this.clickLimpiar.emit(categoria);
  }
}
