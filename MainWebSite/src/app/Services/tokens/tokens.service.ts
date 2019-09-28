import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../app.config';
import { JwtService } from '../../Jwt/jwt.service';
import { TokenResponse } from './models/token-response';

@Injectable()
export class TokensService {

  private tokenService = this.config.getConfig('TokensServiceUrl');

  constructor(private config: AppConfig, private jwt: JwtService) { }

  getCompanyTokens(): Observable<TokenResponse[]> {
    const { jwt, tokenService } = this;
    return jwt.post(`${tokenService}GetCompanyTokens`, '');
  }

  getUserTokens(): Observable<TokenResponse[]> {
    const { jwt, tokenService } = this;
    return jwt.post(`${tokenService}GetUserTokens`, '');
  }
}
