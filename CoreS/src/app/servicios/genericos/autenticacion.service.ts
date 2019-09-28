import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { RespuestaBase } from '../../modelos/genericos/respuesta-base';
import { Token } from '../../modelos/genericos/token';


@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {
  private currentUserSubject: BehaviorSubject<Token>;
  public currentUser: Observable<Token>;
  private env;

  constructor(private http: HttpClient) {
    this.env = environment;
    this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('usuarioActual')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Token {
    return this.currentUserSubject.value;
  }

  autenticar(nombreUsuario: string, contraseña: string) {
    let credenciales = {
      usuario: nombreUsuario,
      contraseña: contraseña,
      codigosistema: "028"
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*'
      })
    }
    return this.http.post<any>(`${this.env.servicioAutenticacionUrl}autenticar`, JSON.stringify(credenciales), httpOptions)
      .pipe(
        map((tokenRespuesta: RespuestaBase) => {
          let token: Token = JSON.parse(tokenRespuesta.Resultado);
          sessionStorage.setItem('tokenUsuario', token.TokenAcceso);
          sessionStorage.setItem('codigoActualizacionUsuario', token.CodigoActualizacion.toString());
          return tokenRespuesta;
        })
      );
  }

  cerrarSesion() {
    sessionStorage.removeItem('tokenUsuario');
    sessionStorage.removeItem('codigoActualizacionUsuario');
    this.currentUserSubject.next(null);
  }
}
