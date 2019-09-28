import { XHRBackend } from '@angular/http';
import { JwtRequestOptions } from './jwt.options';
import { JwtService } from './jwt.service';
import { AuthenticationService } from '../Services/users/auth.service';
import { GlobalService } from '../Services/shared/global.service';

function httpServiceFactory(backend: XHRBackend, options: JwtRequestOptions, authenticationService: AuthenticationService, globalService: GlobalService) {
    return new JwtService(backend, options, authenticationService, globalService);
}
export { httpServiceFactory };
