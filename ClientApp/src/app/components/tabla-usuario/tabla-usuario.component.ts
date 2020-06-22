import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../Servicios/usuario.service';

@Component({
  selector: 'tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styles: []
})
export class TablaUsuarioComponent implements OnInit {
  @Input() usuarios: any;
  encabezados: string[] = ["Id", "Usuario", "Nombre", "Tipo de usuario"];
  @Input() opciones = false;
  constructor(private usuarioServices: UsuarioService) { }

  ngOnInit() {
    this.usuarioServices.getUsuarios().subscribe(rsp => {
      console.log(rsp);
      this.usuarios = rsp;
    });
  }

}
