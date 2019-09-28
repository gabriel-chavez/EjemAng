import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../../Services/users/auth.service';
import { GlobalService } from '../../../Services/shared/global.service';
import { CaptchaComponent } from '../../shared/components/captcha/captcha.component';
import { AppConfig } from '../../../app.config';
import { Login } from '../../../Services/users/models/login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model: Login = new Login();
    maskPassword: string;
    loading = false;
    error = '';
    isVisibleKeyboard = false;
    isVisibleInitialMessage = false;
    validateCaptcha = true;
    @ViewChild(CaptchaComponent) captcha: CaptchaComponent;

    constructor(private router: Router
        , private authenticationService: AuthenticationService
        , private config: AppConfig
        , private messageService: GlobalService) {
        this.model.username = '90000100000';
        this.model.password = '';
    }

    ngOnInit() {
        if (sessionStorage.getItem('userActual')) {
            this.authenticationService.logout();
        }
        this.isVisibleInitialMessage = this.config.getConfig('showMessageInitial');
        this.validateCaptcha = this.config.getConfig('validateCaptcha');
    }

    login() {
        // this.router.navigate(['/']);
        this.loading = true;
        this.messageService.showLoader(true);
        const messageErrorIncorrect = 'Número de Acceso/Clave de Internet incorrectos, por favor verifique sus datos. ';
        // this.captchaService
        //     .verifyCaptcha(this.captcha.toVerify)
        //     .subscribe(res => {
        //         let isCaptchaValid = res.json();
        //         this.isVisibleInitialMessage = this.config.getConfig('showMessageInitial');
        //         if (!this.validateCaptcha) {
        //             isCaptchaValid = true;
        //         }
        //         if (isCaptchaValid) {

        //         } else {
        //             this.loading = false;
        //             this.messageService.showLoader(false);
        //             this.messageService.danger('Control de Seguridad: ', 'El texto introducido no coincide con la imagen');
        //             this.captcha.resetCaptcha();
        //         }
        //     }, error => {
        //         this.messageService.danger('Error en el captcha: ',
        //             'Si el error persiste, por favor comuníquese con el Administrador del Sistema');
        //         console.log(error);
        //         this.loading = false;
        //         this.messageService.showLoader(false);
        //         this.captcha.resetCaptcha();
        //         this.model.password = '';
        //     });

        // this.model.captchaValue = this.captcha.toVerify.captchaValue;
        // this.model.captchaValueToVerify = this.captcha.toVerify.captchaValue;

        this.authenticationService.login(this.model.username, this.model.password, this.captcha.toVerify.captchaValue, this.captcha.toVerify.captchaValueToVerify)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.messageService.showLoader(false);
                    this.router.navigate(['/']);
                } else {
                    this.messageService.danger('Control de Seguridad: ', messageErrorIncorrect);
                    this.error = 'Usuario o contraseña incorrectos';
                    this.loading = false;
                    this.messageService.showLoader(false);
                    this.captcha.resetCaptcha();
                    this.model.password = '';
                    this.maskPassword = '';
                }
            },
                error => {
                    if (error.status === 400) {
                        const errorTemp = error.json();
                        if (errorTemp.error === 'invalid_captcha') {
                            this.messageService.danger('Control de Seguridad: ', errorTemp.error_description);
                        } else if (errorTemp.error === 'invalid_grant') {
                            this.messageService.danger('Control de Seguridad: ', errorTemp.error_description);
                        } else if (errorTemp.error === 'changePasswordRequire') {
                            this.messageService.danger('Control de Seguridad: ', errorTemp.error_description, false, true);
                            this.router.navigate(['/login/changePassword']);
                        } else if (errorTemp.error === 'generatePasswordRequire') {
                            this.messageService.danger('Control de Seguridad: ', errorTemp.error_description, false, true);
                            this.router.navigate(['/login/generateKey']);
                        } else {
                            this.messageService.danger('Control de Seguridad: ', messageErrorIncorrect);
                        }
                        this.error = 'Usuario o contraseña incorrectos';
                        this.loading = false;
                        this.messageService.showLoader(false);
                        this.captcha.resetCaptcha();
                        this.model.password = '';
                        this.maskPassword = '';
                    } else {
                        /* this.messageService.danger('Error en la autentificacion: ',
                            'Si el error persiste, por favor comuníquese con el Administrador del Sistema');
                        console.log(error);
                        this.loading = false;
                        
                        this.error = <any>(error && error.json ? error.json().error_description : '');
                        this.captcha.resetCaptcha();
                        this.model.password = '';
                        this.maskPassword = ''; */
                        this.messageService.showLoader(false);
                        this.router.navigate(['/']);
                    }
                });
    }

    handleShowKeyboard() {
        this.isVisibleKeyboard = !this.isVisibleKeyboard;
    }

    handleKeyboard($event) {
        if ($event === 'back') {
            this.model.password = this.model.password.substring(0, this.model.password.length - 1);
        } else {
            this.model.password = this.model.password + $event;
        }
        this.maskPassword = '●'.repeat(this.model.password.length);
    }

    resetForm() {
    }

    handlePasswordChange($event) {
        const character = $event.value.split('').find(x => x !== '●');
        this.maskPassword = '●'.repeat($event.value.length);
        this.model.password = this.model.password.substring(0, $event.value.length);
        if ($event.value.length === 1) {
            this.model.password = '';
        }
        this.model.password = character ? this.model.password + character : this.model.password;
    }

}
