import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'buscador-producto-nombre',
  templateUrl: './buscador-producto-nombre.component.html',
  styles: []
})
export class BuscadorProductoNombreComponent implements OnInit {

  @Output() clickButton: EventEmitter<any>;
  @Output() clickLimpiar: EventEmitter<any>;
  constructor() {
    this.clickButton = new EventEmitter();
    this.clickLimpiar = new EventEmitter();
  }

  ngOnInit() {
  }

  filtrar(nombre: string) {
    this.clickButton.emit(nombre);
  }

  limpiar(nombre) {
    this.clickLimpiar.emit(nombre);
  }
}
