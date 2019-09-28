import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../servicios/genericos/autenticacion.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogoCargaComponent } from '../componentes/genericos/dialogo-carga/dialogo-carga.component';
import { finalize } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  interfazDialogo: MatDialogRef<DialogoCargaComponent>;

  constructor(private servicioAutenticacion: AutenticacionService, private dialogo: MatDialog) { }

  intercept(peticion: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.mostrarDialogoCargando(next.handle(peticion));
    let usuarioActual = this.servicioAutenticacion.currentUserValue;
    if (usuarioActual && usuarioActual.TokenAcceso) {
      peticion = peticion.clone({
        setHeaders: {
          Authorization: `Bearer ${usuarioActual.TokenAcceso}`
        }
      });
    }
    return next.handle(peticion).pipe(
      finalize(() => this.interfazDialogo.close())
    );
  }

  mostrarDialogoCargando(observable: Observable<Object>) {
    this.interfazDialogo = this.dialogo.open(DialogoCargaComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
  }
}
