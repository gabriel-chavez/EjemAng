import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutenticacionService } from '../servicios/genericos/autenticacion.service';

@Injectable({
  providedIn: 'root'
})

export class ValidadorAutorizacion implements CanActivate {

  constructor(private router: Router, private autenticacionService: AutenticacionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const usuarioActual = this.autenticacionService.currentUserValue;
    if (usuarioActual) {
      return true;
    }
    this.router.navigate(['/inicio-sesion'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
