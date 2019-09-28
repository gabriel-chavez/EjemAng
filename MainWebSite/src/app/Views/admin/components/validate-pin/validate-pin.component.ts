import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CaptchaComponent } from '../../../shared/components/captcha/captcha.component';
import { ValidatePinModel } from '../../../../Services/users/models/validate-pin-model';
import { UserService } from '../../../../Services/users/user.service';
import { GlobalService } from '../../../../Services/shared/global.service';
import { AppConfig } from '../../../../app.config';
import { NumberPadComponent } from '../../../shared/components/number-pad/number-pad.component';


@Component({
  selector: 'app-validate-pin',
  templateUrl: './validate-pin.component.html',
  styleUrls: ['./validate-pin.component.css']
})

export class ValidatePinComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();
  @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;
  @ViewChild(NumberPadComponent) numberPadComponent: NumberPadComponent;
  @Input() accessNumber = '';
  @Input() readOnlyAccessNumber = false;
  @Input() isVisibleCancel = false;
  validateCaptcha = true;
  result = { isOk: false, numberAccess: '', message: '', pin: '', card: '' };
  validatePin: ValidatePinModel = new ValidatePinModel();

  constructor(private userService: UserService
    , private globalService: GlobalService
    , private config: AppConfig) {
  }

  ngOnInit() {
    this.validatePin.card = this.accessNumber;
    this.validateCaptcha = this.config.getConfig('validateCaptcha');
  }

  handleKeyPad($event) {
    this.validatePin.pin = $event;
  }

  handleSubmit() {
    this.globalService.showLoader(true);

    this.validatePin.captchaValue = this.captchaComponent.toVerify.captchaValue;
    this.validatePin.captchaValueToVerify = this.captchaComponent.toVerify.captchaValueToVerify;
    this.userService.validatePin(this.validatePin)
      .subscribe(res => {
        this.result = res.json();

        if (this.result.isOk) {
          this.result.numberAccess = this.validatePin.card;
          this.result.pin = this.validatePin.pin;
          this.result.card = this.validatePin.card;
          this.onSubmit.emit(this.result);
        } else if (this.result.message === 'invalid_username') {
          this.globalService.danger('Alerta: ', 'Tarjeta/PIN incorrectos, verifique sus datos');
          this.captchaComponent.resetCaptcha();
          this.numberPadComponent.resetPin();
        } else {
          this.globalService.danger('Alerta: ', 'Tarjeta/PIN incorrectos, verifique sus datos ');
          this.captchaComponent.resetCaptcha();
          this.numberPadComponent.resetPin();
        }
        this.globalService.showLoader(false);
      }, error => {

        if (error.status === 401 || error.status === 500) {
          this.globalService.danger('Error: ', error.json());
        } else if (error.status === 400) {
          const errorTemp = error.json();
          if (errorTemp.message === 'invalid_captcha') {
            this.globalService.showLoader(false);
            this.globalService.danger('Alerta: ', 'El texto introducido no coincide con la imagen');
          } else if (errorTemp.message === 'card_pin_error') {
            this.globalService.showLoader(false);
            this.globalService.danger('Alerta: ', 'Tarjeta/PIN incorrectos, verifique sus datos');
          }
        } else {
          this.globalService.danger('Error: ', 'Si el error persiste, por favor comuníquese con el Administrador del Sistema');
          console.log('error en el servicio del pin');
        }
        this.globalService.showLoader(false);
        this.captchaComponent.resetCaptcha();
        this.numberPadComponent.resetPin();
      });
  }
}
