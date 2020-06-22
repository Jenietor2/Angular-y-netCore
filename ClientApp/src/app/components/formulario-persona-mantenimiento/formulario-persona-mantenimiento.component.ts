import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonaService } from '../../Servicios/persona.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario-persona-mantenimiento',
  templateUrl: './formulario-persona-mantenimiento.component.html',
  styles: []
})
export class FormularioPersonaMantenimientoComponent implements OnInit {
  persona: FormGroup;
  titulo = "";
  parametro = "";
  constructor(private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.persona = new FormGroup(
      {
        'idPersona': new FormControl("0"),
        'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
        'primerApellido': new FormControl("", [Validators.required, Validators.maxLength(150)]),
        'segundoApellido': new FormControl("", [Validators.required, Validators.maxLength(150)]),
        'telefono': new FormControl("", [Validators.required, Validators.maxLength(10)]),
        'correo': new FormControl("", [Validators.required, Validators.pattern("^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$")], this.validarCorreo.bind(this)),
        'fechaNacimiento': new FormControl("", [Validators.required])
      }
    );
    this.activatedRoute.params.subscribe(rsp => {
      this.parametro = rsp["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Crear persona"
      } else {
        this.titulo = "Editando persona";
        this.editar(this.parametro);
      }
    });

  }

  ngOnInit() {
  }
  guardar() {
    if (this.persona.valid) {
      var fechaNac = this.persona.controls["fechaNacimiento"].value.split("-");
      var anio = fechaNac[0];
      var mes = fechaNac[1];
      var dia = fechaNac[2];
      this.persona.controls["fechaNacimiento"].setValue(mes + "/" + dia + "/" + anio);
      this.personaService.insertPersona(this.persona.value).subscribe(rsp => { this.router.navigate(['/persona-crear']) });
    }
  }
  editar(id) {
    var idPersona = parseInt(id);
    this.personaService.editarPersona(idPersona).subscribe(rsp => {
      console.log(rsp);
      this.persona.controls["idPersona"].setValue(rsp["idPersona"]);
      this.persona.controls["nombre"].setValue(rsp["nombre"]);
      this.persona.controls["primerApellido"].setValue(rsp["primerApellido"]);
      this.persona.controls["segundoApellido"].setValue(rsp["segundoApellido"]);
      this.persona.controls["telefono"].setValue(rsp["telefono"]);
      this.persona.controls["correo"].setValue(rsp["correo"]);
      this.persona.controls["fechaNacimiento"].setValue(rsp["fechaNacimientoEditar"]);
    });
  }
  //Validaciones personalizadas
  //Es un metodo asincrono va como tercer parametro dentro del FormControl y si o si debe devolver una promesa
  validarCorreo(control: FormControl) {
      var promesa
      return promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.personaService.validarCorreo(this.persona.controls["idPersona"].value, this.persona.controls["correo"].value).subscribe(rsp => {
          if (rsp > 0) {
            resolve ({ exist: true });
          } else {
            resolve(null);
          }
        });
      }
      });
  }
}
