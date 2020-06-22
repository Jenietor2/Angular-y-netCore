import { Component, OnInit, Input } from '@angular/core';
import { PersonaService } from '../../Servicios/persona.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'tabla-persona',
  templateUrl: './tabla-persona.component.html',
  styles: []
})
export class TablaPersonaComponent implements OnInit {
  @Input() personas: any;
  @Input() isMantenimiento = false;
  encabezadosPersona = ["Id", "Nombre Completo", "Télefono", "Correo", "Fecha de nacimiento"];
  p: number = 1;
  constructor(private personaServices: PersonaService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.personaServices.getPersona().subscribe(rsp => this.personas = rsp)
  }

  eliminarPersona(idPersona) {
    this.personaServices.eliminarPersona(idPersona).subscribe(rsp => {
      this.personaServices.getPersona().subscribe(rsp => this.personas = rsp)
    });
  }

}
