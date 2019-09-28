import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TokenComponent } from '../token/token.component';
import { PasswordValidationComponent } from '../password-validation/password-validation.component';

@Component({
  selector: 'app-token-modal',
  templateUrl: './token-modal.component.html',
  styleUrls: ['./token-modal.component.css']
})
export class TokenModalComponent implements OnInit {

  @Input() validatePasswordInsteadToken = true;
  @Input() isVisible: boolean;
  @Input() disabled = false;
  @Input() isUserToken = false;
  @Output() onSubmit = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @ViewChild(TokenComponent) token: TokenComponent;
  @ViewChild(PasswordValidationComponent) passwordValidation: PasswordValidationComponent;

  constructor() { }

  ngOnInit() {
  }

  handleTokenValidationSubmit($event) {
    this.onSubmit.emit($event);
  }

  handlePasswordValidationSubmit($event: string) {
    this.onSubmit.emit($event);
  }

  handleOnClose() {
    this.onClose.emit(false);
    if (this.token) {
      this.token.resetPad();
    }
    if (this.passwordValidation) {
      this.passwordValidation.resetForm();
    }
  }

  handleClosed($event: boolean) {
    this.onClose.emit($event);
  }
}
