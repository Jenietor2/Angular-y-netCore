import { Component, OnInit, Inject } from '@angular/core';
import { UsuarioService } from '../../Servicios/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  usuario: FormGroup;
  error = false;
  urlBase;
  constructor(private usuarioServices: UsuarioService, private router: Router, @Inject("BASE_URL") url: string) {
    this.urlBase = url;
    this.usuario = new FormGroup(
      {
        'nombreUsuario': new FormControl("", [Validators.required]),
        'password': new FormControl("", [Validators.required])
      }
    );
  }

  ngOnInit() {
  }

  login() {
    if (this.usuario.valid) {
      this.usuarioServices.login(this.usuario.value).subscribe(rsp => {
        console.log(rsp);
        if (rsp["IdUsuario"] == 0) {
          this.error = true;
        } else {
          this.error = false;
          //this.router.navigate(['/filtradoProductoNombre']);
          window.location.href = this.urlBase + "filtradoProductoNombre";
        }
      });
      
    }
  }
}
