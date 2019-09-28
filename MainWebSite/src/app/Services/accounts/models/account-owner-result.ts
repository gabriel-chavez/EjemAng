export class AccountOwnerResult {
    currency: string;
    owner: string;
    accountNumber: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
