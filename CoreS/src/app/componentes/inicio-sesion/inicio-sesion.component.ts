import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { DialogoCargaComponent } from '../genericos/dialogo-carga/dialogo-carga.component';
import { AutenticacionService } from '../../servicios/genericos/autenticacion.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  inicioSesionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private servicioAutenticacion: AutenticacionService, private router: Router) {
  }

  ngOnInit() {
    this.inicioSesionForm = this.formBuilder.group({ usuario: ['', [Validators.required]], clave: ['', [Validators.required]] })
  }

  public verificarError = (control: string, error: string) => {
    return this.inicioSesionForm.controls[control].hasError(error);
  }

  iniciarSesion() {
    console.log("Es posible iniciar sesión: " + this.inicioSesionForm.valid);
    if (this.inicioSesionForm.valid) {
      this.servicioAutenticacion.autenticar(this.inicioSesionForm.controls.usuario.value, this.inicioSesionForm.controls.clave.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/pagina-principal']);
            console.log("inció sesión");
          });
    }
  }

  
}
