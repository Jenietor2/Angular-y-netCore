import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'buscador-persona-nombreCompleto',
  templateUrl: './buscador-persona-nombre-completo.component.html',
  styles: []
})
export class BuscadorPersonaNombreCompletoComponent implements OnInit {
  @Output() buscarPersona: EventEmitter<any>
  constructor() {
    this.buscarPersona = new EventEmitter();
  }

  ngOnInit() {
  }
  buscar(nombre) {
    this.buscarPersona.emit(nombre);
  }
}
