import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../Servicios/usuario.service';
import { PersonaService } from '../../Servicios/persona.service';

@Component({
  selector: 'formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styles: []
})
export class FormularioUsuarioComponent implements OnInit {
  usuario: FormGroup;
  titulo = "";
  parametro = "";
  tiposUsuarios: any;
  personas: any;
  constructor(private activatedRoute: ActivatedRoute,
    private usuarioServices: UsuarioService, private personaService: PersonaService) {
    this.usuario = new FormGroup(
      {
        'idUsuario': new FormControl("0"),
        'nombre': new FormControl(""),
        'idTipoUsuario': new FormControl(""),
        'idPersona': new FormControl(""),
        'password': new FormControl(""),
        'passwordConfirm': new FormControl("")
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(rsp => {
      this.parametro = rsp["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Crear usuario"
      } else {
        this.titulo = "Editar usuario"
      }
    });
    //llenamos el objeto tipoUsuarios
    this.usuarioServices.getTipoUsuario().subscribe(rsp => this.tiposUsuarios = rsp);
    //llenamos el objeto personas
    this.personaService.getPersona().subscribe(rsp => {
      console.log(rsp);
      this.personas = rsp;
    });
  }

}
