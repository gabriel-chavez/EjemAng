import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CaptchaModel } from '../../../../Services/users/models/captcha-model';
import { VerificationCaptchaModel } from '../../../../Services/users/models/verification-captcha-model';
import { UserService } from '../../../../Services/users/user.service';
import { AppConfig } from '../../../../app.config';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  image: CaptchaModel = new CaptchaModel();
  toVerify: VerificationCaptchaModel = new VerificationCaptchaModel();

  validate = false;
  @Input() tabIndex = '99';
  @Output() onKeyEnter = new EventEmitter();
  validateCaptchaConfig = true;

  constructor(private userService: UserService, private appConfig: AppConfig, private globalService: GlobalService) { }

  ngOnInit() {
    this.resetCaptcha();
    this.validateCaptchaConfig = this.appConfig.getConfig('validateCaptcha');
  }

  handleChangeCaptcha() {
    this.resetCaptcha();
  }

  resetCaptcha() {
    this.globalService.showLoader(true);
    this.userService
      .getCaptcha()
      .subscribe(res => {
        this.image = res.json();
        this.toVerify.captchaValue = this.image.value;
        this.toVerify.captchaValueToVerify = '';
        this.globalService.showLoader(false);
      }, error => {
        this.globalService.showLoader(false);
      });
  }

  // verifyCaptcha() {
  //   this.captchaService
  //     .verifyCaptcha(this.toVerify)
  //     .subscribe(res => {
  //     }, error => console.log(error));
  // }

  handleKeyDown($event) {
    if ($event.key === 'enter') {
      this.onKeyEnter.emit();
    }
  }

  validateCaptcha() {
    this.validate = true;
  }

  isValid() {
    if (this.toVerify.captchaValueToVerify.length > 0) {
      return true;
    }
    return false;
  }
}
