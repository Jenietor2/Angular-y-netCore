import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../../Servicios/usuario.service';

@Injectable()
export class SeguridadGuard implements CanActivate {
  sesion = false;
  constructor(private router: Router, private usuarioServices: UsuarioService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.usuarioServices.getSession().subscribe(rsp => {
      if (rsp["valor"] == "") {
        this.sesion = false;
        this.router.navigate(['/pagina-error']);
      } else {
        this.sesion = true;
      }
    });
    return this.sesion;
  }
}
