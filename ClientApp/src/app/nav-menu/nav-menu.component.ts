import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../Servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  login = false;
  menus: any;
  constructor(private usuarioServices: UsuarioService, private router: Router) {

  }
  ngOnInit() {
    this.usuarioServices.getSession().subscribe(rsp => {
      if (rsp["valor"] != "") {
        this.login = true;
        //listar paginas
        this.usuarioServices.listarPaginas().subscribe(rsp => {
          console.log(rsp);
          this.menus = rsp;
        });
      } else {
        this.login = false;
      }
    });
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  cerrarSesion() {
    this.usuarioServices.cerrarSesion().subscribe(rsp => {
      if (rsp["valor"] == "ok") {
        this.login = false;
        this.router.navigate(["/login"]);
      } else {
        this.login = true;
      }
    });
  }
}
