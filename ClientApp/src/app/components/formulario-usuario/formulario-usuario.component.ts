import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../Servicios/usuario.service';
import { PersonaService } from '../../Servicios/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styles: []
})
  //Clase principal
export class FormularioUsuarioComponent implements OnInit {
  usuario: FormGroup;
  titulo = "";
  parametro = "";
  tiposUsuarios: any;
  personasSinUsuario: any;
  error = false;
  mostrar = true;
  //Constructor
  constructor(private activatedRoute: ActivatedRoute,
              private usuarioServices: UsuarioService,
              private personaService: PersonaService,
              private router: Router) {
    //Se instancia el FormGroup, para asi agregar las validaciones segun su formControlName en el html
    this.usuario = new FormGroup(
      {
        'idUsuario': new FormControl("0"),
        'nombreUsuario': new FormControl("", [Validators.required, Validators.maxLength(100)], this.validarNombreUsuario.bind(this)),
        'idTipoUsuario': new FormControl("", [Validators.required]),
        'idPersona': new FormControl("", [Validators.required]),
        'password': new FormControl("", [Validators.required]),
        'passwordConfirm': new FormControl("", [Validators.required, this.validarPassword.bind(this)])
      }
    );
  }
  //Metodo que se ejecuta al iniciar la pagina
  ngOnInit() {
    //Se extrae el parametro enviado por url para establecer el titulo del formulario
    this.activatedRoute.params.subscribe(rsp => {
      this.parametro = rsp["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Crear usuario"
        this.mostrar = true;
      } else {
        this.titulo = "Editar usuario"
        this.mostrar = false;
        this.editar(rsp["id"]);
      }
    });
    //llenamos el objeto tipoUsuarios
    this.usuarioServices.getTipoUsuario().subscribe(rsp => this.tiposUsuarios = rsp);
    //llenamos el objeto personas
    this.personaService.getPersonasSinUsuario().subscribe(rsp => this.personasSinUsuario = rsp);
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
        this.usuarioServices.validarNombreUsuario(this.usuario.controls["idUsuario"].value, this.usuario.controls["nombreUsuario"].value)
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
  //Metodo encargado de recuperar la informacion del usuario a editar
  editar(idUsuario) {
    this.usuarioServices.getUsuario(idUsuario).subscribe(rsp => {
      this.usuario.controls["idUsuario"].setValue(rsp["idUsuario"]);
      this.usuario.controls["nombreUsuario"].setValue(rsp["nombreUsuario"]);
      this.usuario.controls["idTipoUsuario"].setValue(rsp["idTipoUsuario"])
      this.usuario.controls["idPersona"].setValue("1");
      this.usuario.controls["password"].setValue("1");
      this.usuario.controls["passwordConfirm"].setValue("1");
    });
  }
  //Metodo encargado de insertar o editar un usuario en la BD
  guardar() {
    if (this.usuario.valid) {
      this.usuarioServices.insertarUsuario(this.usuario.value).subscribe(rsp => {
        this.router.navigate(["/usuarios"]);
      });
    } else {
      this.error = true;
    }
    
  }
}
