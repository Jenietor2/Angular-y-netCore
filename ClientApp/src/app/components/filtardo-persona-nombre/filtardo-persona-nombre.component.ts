import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../Servicios/persona.service';

@Component({
  selector: 'app-filtardo-persona-nombre',
  templateUrl: './filtardo-persona-nombre.component.html',
  styles: []
})
export class FiltardoPersonaNombreComponent implements OnInit {
  personas: any;
  constructor(private personaServices: PersonaService) { }

  ngOnInit() {
  }
  buscar(nombre) {
    this.personaServices.getPersonaFiltrada(nombre.value).subscribe(rsp => {
      console.log(rsp);
      this.personas = rsp;
    });
  }
}
