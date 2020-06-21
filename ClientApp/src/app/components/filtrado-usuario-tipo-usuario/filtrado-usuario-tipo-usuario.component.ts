import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Servicios/usuario.service';

@Component({
  selector: 'app-filtrado-usuario-tipo-usuario',
  templateUrl: './filtrado-usuario-tipo-usuario.component.html',
  styles: []
})
export class FiltradoUsuarioTipoUsuarioComponent implements OnInit {
  usuariosPorTipo: any;
  constructor(private usuarioServices: UsuarioService) { }

  ngOnInit() {
  }
  filtrar(tipoUsuario) {
    if (tipoUsuario.value == "") {
      this.usuarioServices.getUsuarios().subscribe(rsp => this.usuariosPorTipo = rsp);
    } else {
      this.usuarioServices.getUsuariosXTipo(tipoUsuario.value).subscribe(rsp => {
        console.log(rsp);
        this.usuariosPorTipo = rsp;
      });
    }
  }
}
