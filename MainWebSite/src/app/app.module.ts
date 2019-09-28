import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { XHRBackend, RequestOptions } from '@angular/http';

import { routing } from './app.routing';
import { JwtModule } from './Jwt/jwt.module';
import { AuthGuard } from './Directives/auth.guard';
import { SharedModule } from './Views/shared/shared.module';
import { CoreModule } from './Services/shared/core.module';

import { AuthenticationService } from './Services/users/auth.service';
import { UserService } from './Services/users/user.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './Views/admin/login/login.component';
import { DefaultComponent } from './Views/admin/default/default.component';
import { VirtualPathComponent } from './Views/admin/components/virtual-path/virtual-path.component';
import { StrengthPasswordComponent } from './Views/admin/components/strength-password/strength-password.component';
import { KeysPipe } from './Helpers/keys.pipe';
import { MasterPageComponent } from './Views/admin/master-page/master-page.component';
import { GlobalComponentComponent } from './Views/admin/components/global-component/global-component.component';
import { HeaderComponent } from './Views/admin/components/header/header.component';
import { ChangePasswordComponent } from './Views/admin/change-password/change-password.component';
import { GenerateKeyComponent } from './Views/admin/generate-key/generate-key.component';
import { HeaderLoginComponent } from './Views/admin/components/header-login/header-login.component';
import { FooterComponent } from './Views/admin/components/footer/footer.component';
import { MasterLoginComponent } from './Views/admin/master-login/master-login.component';
import { SecurityCertificateComponent } from './Views/admin/components/security-certificate/security-certificate.component';
import { SliderLoginComponent } from './Views/admin/components/slider-login/slider-login.component';
import { FunctionsFeaturesComponent } from './Views/admin/components/pages-default/functions-features/functions-features.component';
import { ManualsComponent } from './Views/admin/components/pages-default/manuals/manuals.component';
import { DemoComponent } from './Views/admin/components/pages-default/demo/demo.component';
import { GuideComponent } from './Views/admin/components/pages-default/guide/guide.component';
import { TimetableOfficesComponent } from './Views/admin/components/pages-default/timetable-offices/timetable-offices.component';
import { FaqComponent } from './Views/admin/components/pages-default/faq/faq.component';
import { NewsComponent } from './Views/admin/components/pages-default/news/news.component';
import { ContactComponent } from './Views/admin/components/pages-default/contact/contact.component';
import { UnderConstructionComponent } from './Views/admin/components/under-construction/under-construction.component';
import { BreadCrumbComponent } from './Views/admin/components/bread-crumb/bread-crumb.component';

import { DevsComponent } from './Views/admin/devs/devs.component';
import { ValidatePinComponent } from './Views/admin/components/validate-pin/validate-pin.component';
import { CreatePasswordComponent } from './Views/admin/components/create-password/create-password.component';
import { ExchangeRatesService } from './Services/exchange-rates/exchange-rates.service';
import { ParametersService } from './Services/parameters/parameters.service';
import { DataService } from './Services/shared/data.service';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    VirtualPathComponent,
    StrengthPasswordComponent,
    LoginComponent,
    MasterPageComponent,
    HeaderComponent,
    ChangePasswordComponent,
    KeysPipe,
    GenerateKeyComponent,
    HeaderLoginComponent,
    FooterComponent,
    MasterLoginComponent,
    SecurityCertificateComponent,
    SliderLoginComponent,
    FunctionsFeaturesComponent,
    ManualsComponent,
    DemoComponent,
    GuideComponent,
    TimetableOfficesComponent,
    FaqComponent,
    NewsComponent,
    ContactComponent,
    GlobalComponentComponent,
    UnderConstructionComponent,
    BreadCrumbComponent,
    DevsComponent,
    ValidatePinComponent,
    CreatePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    SharedModule,
    JwtModule,
    CoreModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    ParametersService,
    ExchangeRatesService,
    DataService,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppConfig],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function init_app(appConfig: AppConfig) {
  return () => appConfig.load();
}
