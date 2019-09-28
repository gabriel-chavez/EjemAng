import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatProgressSpinnerModule, MatSnackBarModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatListModule, MatCardModule, MatInputModule, MatSelectModule, MatMenuModule, MatNativeDateModule, MatTooltipModule, MatTabsModule, MatSliderModule, MatSlideToggleModule, MatRippleModule, MatRadioModule, MatProgressBarModule, MatGridListModule, MatExpansionModule, MatDatepickerModule, MatChipsModule, MatCheckboxModule, MatButtonToggleModule, MatAutocompleteModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogoCargaComponent } from './componentes/genericos/dialogo-carga/dialogo-carga.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { ErrorInterceptor } from './utilidades/error.interceptor';
import { JwtInterceptor } from './utilidades/jwt.interceptor';
import { BarraNavegacionComponent } from './componentes/genericos/barra-navegacion/barra-navegacion.component';
import { PaginaPrincipalComponent } from './componentes/genericos/pagina-principal/pagina-principal.component';
import { CommonModule } from '@angular/common';
import { ElementoMenuComponent } from './componentes/genericos/elemento-menu/elemento-menu.component';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { PortalModule } from '@angular/cdk/portal';
import { PlatformModule } from '@angular/cdk/platform';
import { OverlayModule } from '@angular/cdk/overlay';
import { ObserversModule } from '@angular/cdk/observers';
import { BidiModule } from '@angular/cdk/bidi';
import { A11yModule } from '@angular/cdk/a11y';
import { NavegacionMenuService } from './servicios/genericos/navegacion-menu.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    DialogoCargaComponent,
    BarraNavegacionComponent,
    PaginaPrincipalComponent,
    ElementoMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
  ],
  entryComponents: [DialogoCargaComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    NavegacionMenuService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
