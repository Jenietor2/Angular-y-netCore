import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../Servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styles: []
})
export class TablaUsuarioComponent implements OnInit {
  @Input() usuarios: any;
  encabezados: string[] = ["Id", "Usuario", "Nombre", "Tipo de usuario"];
  @Input() opciones = false;
  constructor(private usuarioServices: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.usuarioServices.getUsuarios().subscribe(rsp => this.usuarios = rsp);
  }
  //Metodo para eliminar un usuario segun su id
  eliminarUsuario(idUsuario) {
    this.usuarioServices.eliminarUsuario(idUsuario).subscribe(rsp => {
      this.usuarioServices.getUsuarios().subscribe(rsp => this.usuarios = rsp);
    });
  }
}
