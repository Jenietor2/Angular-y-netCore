import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  personasSinUsuario: any;
  constructor(private activatedRoute: ActivatedRoute,
    private usuarioServices: UsuarioService, private personaService: PersonaService) {
    //Se instancia el FormGroup, para asi agregar las validaciones segun su formControlName en el html
    this.usuario = new FormGroup(
      {
        'idUsuario': new FormControl("0"),
        'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)], this.validarNombreUsuario.bind(this)),
        'idTipoUsuario': new FormControl("", [Validators.required]),
        'idPersona': new FormControl("", [Validators.required]),
        'password': new FormControl("", [Validators.required]),
        'passwordConfirm': new FormControl("", [Validators.required, this.validarPassword.bind(this)])
      }
    );
  }

  ngOnInit() {
    //Se extrae el parametro enviado por url para establecer el titulo del formulario
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
    this.personaService.getPersonasSinUsuario().subscribe(rsp => this.personasSinUsuario = rsp);
  }

  guardar() {

  }
  //Validaciones personalizadas
  validarPassword(control: FormControl) {
    if (control.value != "") {
      if (this.usuario.controls["password"].value != control.value) {
        return { noConfirm: true };
      } else {
        return null;
      }
    }
  }
  //Validaciones asincronas
  validarNombreUsuario(control: FormControl) {
    var promesa;
    return promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != undefined && control.value != null) {
        this.usuarioServices.validarNombreUsuario(this.usuario.controls["idUsuario"].value, this.usuario.controls["nombre"].value)
          .subscribe(rsp => {
            if (rsp > 0) {
              resolve({ userExist: true });
            } else {
              resolve(null);
            }
          });
      }
    });
  }
}
