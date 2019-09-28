import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/users/user.service';
import { AuthenticationService } from '../../../Services/users/auth.service';
import { ChangePasswordModel } from '../../../Services/users/models/change-password-model';
import { GlobalService } from '../../../Services/shared/global.service';
import { CaptchaComponent } from '../../shared/components/captcha/captcha.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [AuthenticationService, UserService]
})
export class ChangePasswordComponent implements OnInit {

  errorMessage: any;
  submitted: boolean;
  ok: String;
  changePassword: ChangePasswordModel = new ChangePasswordModel();
  radioSelected = 'old';
  @ViewChild('txtOldPassword') txtOldPassword: ElementRef;
  @ViewChild('txtNewPassword') txtNewPassword: ElementRef;
  @ViewChild('txtConfirmPassword') txtConfirmPassword: ElementRef;
  @ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;

  constructor(private userService: UserService
    , private authService: AuthenticationService
    , private globalService: GlobalService
    , private router: Router) {
    this.changePassword.accessNumber = '90000100000';
  }

  ngOnInit(): void {
  }

  private reset() {
    this.changePassword.oldPassword = null;
    this.changePassword.newPassword = null;
    this.changePassword.confirmPassword = null;
  }

  handleRadio($event: string) {
    this.radioSelected = $event;
    switch (this.radioSelected) {
      case 'old':
        this.txtOldPassword.nativeElement.focus();
        break;
      case 'new':
        this.txtNewPassword.nativeElement.focus();
        break;
      case 'confirm':
        this.txtConfirmPassword.nativeElement.focus();
        break;
    }
  }

  handleKeyChange($event) {
    switch (this.radioSelected) {
      case 'old':
        if ($event === 'back') {
          this.changePassword.oldPassword = this.changePassword.oldPassword.substring(0, this.changePassword.oldPassword.length - 1);
        } else {
          this.changePassword.oldPassword = this.changePassword.oldPassword + $event;
        }
        this.txtOldPassword.nativeElement.focus();
        break;
      case 'new':
        if ($event === 'back') {
          this.changePassword.newPassword = this.changePassword.newPassword.substring(0, this.changePassword.newPassword.length - 1);
        } else {
          this.changePassword.newPassword = this.changePassword.newPassword + $event;
        }
        this.txtNewPassword.nativeElement.focus();
        break;
      case 'confirm':
        if ($event === 'back') {
          this.changePassword.confirmPassword = this.changePassword.confirmPassword
            .substring(0, this.changePassword.confirmPassword.length - 1);
        } else {
          this.changePassword.confirmPassword = this.changePassword.confirmPassword + $event;
        }
        this.txtConfirmPassword.nativeElement.focus();
        break;
    }
  }

  handleVerifyStrength($event) {

  }

  handleChangePassword(): void {
    this.globalService.showLoader(true);
    // this.captchaService
    //   .verifyCaptcha(this.captchaComponent.toVerify)
    //   .subscribe(res => {
    //     const isCaptchaValid = res.json();
    //     if (isCaptchaValid) {

    //     } else {
    //       this.globalService.showLoader(false);
    //       this.globalService.danger('Alerta: ', 'El texto introducido no coincide con la imagen');
    //       this.captchaComponent.resetCaptcha();
    //     }
    //   }, error => {
    //     this.globalService.danger('Error: ', 'Si el error persiste, por favor comuníquese con el Administrador del Sistema');
    //     console.error('error en el servicio captcha');
    //     this.globalService.showLoader(false);
    //   });
    this.changePassword.captchaValue = this.captchaComponent.toVerify.captchaValue;
    this.changePassword.captchaValueToVerify = this.captchaComponent.toVerify.captchaValueToVerify;
    this.userService
      .changePassword(this.changePassword)
      .subscribe(result => {
        this.globalService.showLoader(false);
        this.globalService.success('Mensaje: ', result.json(), false, true);
        this.router.navigate(['/login']);
      }, error => {
        if (error.status === 401 || error.status === 500) {
          this.globalService.danger('Error: ', error.json());
        } else if (error.status === 400) {
          const errorTemp = error.json();
          if (errorTemp.message === 'invalid_captcha') {
            this.globalService.danger('Alerta: ', 'El texto introducido no coincide con la imagen');
          } else {
            this.globalService.danger('Alerta: ', errorTemp);
          }
        } else {
          this.globalService.danger('Error: ', 'Si el error persiste, por favor comuníquese con el Administrador del Sistema');
        }
        console.log('error en el servicio de cambio de contraseña');
        this.globalService.showLoader(false);
        this.captchaComponent.resetCaptcha();
      });
  }
}
