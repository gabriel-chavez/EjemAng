export class AccountClientResult {
    titularAccount: string;
    isOk: boolean;
    message: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
