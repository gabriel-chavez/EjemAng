export class VerificationCaptchaModel {
    value = '';
    valueToVerify = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}