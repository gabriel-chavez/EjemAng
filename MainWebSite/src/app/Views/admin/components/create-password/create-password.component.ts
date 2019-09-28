import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NewUserPassword } from '../../../../Services/users/models/new-password-model';
import { UserService } from '../../../../Services/users/user.service';
import { GlobalService } from '../../../../Services/shared/global.service';
// import { CaptchaService } from '../../../../Services/captcha/captcha.service';
import { CaptchaComponent } from '../../../shared/components/captcha/captcha.component';


@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})

export class CreatePasswordComponent implements OnInit, OnChanges {
  newUser = new NewUserPassword();
  radioSelected = 'new';
  @ViewChild('txtNewPassword') txtNewPassword: ElementRef;
  @ViewChild('txtConfirmPassword') txtConfirmPassword: ElementRef;
  @Input() accessNumber: string = '';
  @Input() readOnlyAccessNumber: boolean = false;
  @Output() onSubmit = new EventEmitter<NewUserPassword>();
  @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;

  constructor(private userService: UserService, private globalService: GlobalService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.newUser.accessNumber = this.accessNumber;
  }

  handleRadio($event) {
    this.radioSelected = $event;
    switch (this.radioSelected) {
      case 'new':
        this.txtNewPassword.nativeElement.focus()
        break;
      case 'confirm':
        this.txtConfirmPassword.nativeElement.focus()
        break;
    }
  }

  handleKeyChange($event) {
    switch (this.radioSelected) {
      case 'new':
        if ($event === 'back') {
          this.newUser.newPassword = this.newUser.newPassword.substring(0, this.newUser.newPassword.length - 1);
        } else {
          this.newUser.newPassword = this.newUser.newPassword + $event;
        }
        this.txtNewPassword.nativeElement.focus();
        break;
      case 'confirm':
        if ($event === 'back') {
          this.newUser.confirmPassword = this.newUser.confirmPassword.substring(0, this.newUser.confirmPassword.length - 1);
        } else {
          this.newUser.confirmPassword = this.newUser.confirmPassword + $event;
        }
        this.txtConfirmPassword.nativeElement.focus();
        break;
    }
  }

  handleVerifyStrength($event) {
  }

  register() {
    this.globalService.showLoader(true);
    // this.captchaService
    //   .verifyCaptcha(this.captchaComponent.toVerify)
    //   .subscribe(res => {
    //     let isCaptchaValid = res.json();
    //     if (isCaptchaValid) {

    //     }
    //     else {
    //       this.globalService.showLoader(false);
    //       this.globalService.danger("Alerta: ", "El texto introducido no coincide con la imagen");
    //       this.captchaComponent.resetCaptcha();
    //     }
    //   }, error => {
    //     this.globalService.danger("Error: ", "Si el error persiste, por favor comuníquese con el Administrador del Sistema");
    //     console.error('error en el servicio captcha');
    //     this.onSubmit.emit(null);
    //     this.globalService.showLoader(false);
    //   });
    this.newUser.captchaValue = this.captchaComponent.toVerify.captchaValue;
    this.newUser.captchaValueToVerify = this.captchaComponent.toVerify.captchaValueToVerify;
    this.userService
      .validateNewPassword(this.newUser)
      .subscribe(result => {
        this.globalService.showLoader(false);
        this.onSubmit.emit(this.newUser);
      }, error => {
        if (error.status === 400) {
          const errorTemp = error.json();
          if (errorTemp.message === 'invalid_captcha') {
            this.globalService.danger('Alerta: ', 'El texto introducido no coincide con la imagen');
          }
        } else {
          console.error('error en el servicio validacion pin');
          this.globalService.danger('Error: ', 'Si el error persiste, por favor comuníquese con el Administrador del Sistema');
        }
        this.globalService.showLoader(false);
        this.captchaComponent.resetCaptcha();
      });
  }
}
