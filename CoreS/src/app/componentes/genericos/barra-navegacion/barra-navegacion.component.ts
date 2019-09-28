import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AutenticacionService } from '../../../servicios/genericos/autenticacion.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent {

  @Output() toggleSidenav = new EventEmitter<void>();
  private returnUrl = '/';

  constructor(private servicioAutenticacion: AutenticacionService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });
  }

  public logout() {
    this.servicioAutenticacion.cerrarSesion();
  }

}
