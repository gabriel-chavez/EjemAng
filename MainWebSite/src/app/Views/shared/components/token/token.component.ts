import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { TokenResponse } from '../../../../Services/tokens/models/token-response';
import { TokensService } from '../../../../Services/tokens/tokens.service';
import { TokenCredentials } from '../../../../Services/tokens/models/token-credentials';
import { NumberPadComponent } from '../number-pad/number-pad.component';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
  providers: [TokensService]
})
export class TokenComponent implements OnInit {

  selectedToken: TokenResponse = new TokenResponse();
  tokens: TokenResponse[] = [];
  data: TokenCredentials;
  closed: boolean;
  @Input() disabled = false;
  @Input() isUserToken = false;
  @Output() onSubmit = new EventEmitter<TokenCredentials>();
  @Output() onClosed = new EventEmitter<boolean>();
  @ViewChild(NumberPadComponent) pad: NumberPadComponent;

  constructor(private tokensService: TokensService, private globalService: GlobalService) {
    this.data = new TokenCredentials();
    this.closed = true;
  }

  ngOnInit() {
    if (this.isUserToken) {
      this.getUserTokens();
    } else {
      this.getCompanyTokens();
    }
  }

  handleKeyPad($event: string) {
    this.data.code = $event;
  }

  handleSubmit() {
    this.onSubmit.emit(this.data);
    this.resetPad();
  }

  handleTokenListChanged() {
    this.data.name = this.selectedToken.name;
  }

  handleClosed() {
    this.data.code = '';
    this.onClosed.emit(true);
    this.resetPad();
  }

  getCompanyTokens() {
    this.tokensService.getCompanyTokens().subscribe(response => this.setResponseData(response), error => this.globalService.danger("Tokens", error.message));
  }

  getUserTokens() {
    this.tokensService.getUserTokens().subscribe(response => this.setResponseData(response), error => this.globalService.danger("Tokens", error.message));
  }

  setResponseData(response: TokenResponse[]) {
    this.tokens = response;
    this.selectedToken = this.tokens[0];
    this.data.name = this.selectedToken.name;
  }

  resetPad() {
    this.pad.resetPad();
  }
}
