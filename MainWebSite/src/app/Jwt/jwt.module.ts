import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHRBackend, RequestOptions } from '@angular/http';
import { JwtService } from './jwt.service';
import { httpServiceFactory } from './jwt.factory';
import { JwtRequestOptions } from './jwt.options';
import { AuthenticationService } from '../Services/users/auth.service';
import { GlobalService } from '../Services/shared/global.service';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
    ],
    declarations: [
    ],
    providers: [
        {
            provide: JwtService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, AuthenticationService, GlobalService]
        }
    ]
})
export class JwtModule { }