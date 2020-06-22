import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../Servicios/usuario.service';

@Component({
  selector: 'buscador-usuario-tipo-usuario',
  templateUrl: './buscador-usuario-tipo-usuario.component.html',
  styles: []
})
export class BuscadorUsuarioTipoUsuarioComponent implements OnInit {
  @Output() buscarUsuario: EventEmitter<any>
  tipoUsuario: any;
  constructor(private usuarioServices: UsuarioService) {
    this.buscarUsuario = new EventEmitter();
  }

  ngOnInit() {
    this.usuarioServices.getTipoUsuario().subscribe(rsp => this.tipoUsuario = rsp);
  }

  filtrar(tipo) {
    this.buscarUsuario.emit(tipo);
  }

}
