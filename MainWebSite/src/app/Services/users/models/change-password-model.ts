import { VerificationCaptchaModel } from './verification-captcha-model';

export class ChangePasswordModel extends VerificationCaptchaModel {
    accessNumber: string;
    oldPassword = '';
    newPassword = '';
    confirmPassword = '';
}
