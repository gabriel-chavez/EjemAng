import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { ValidadorAutorizacion } from './utilidades/validador-autorizacion';
import { PaginaPrincipalComponent } from './componentes/genericos/pagina-principal/pagina-principal.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio-sesion', canActivate: [ValidadorAutorizacion] },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'pagina-principal', component: PaginaPrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
