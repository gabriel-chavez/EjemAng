export class PaymentTaxCheckSpreadsheetsRequest {
    id: number;
    typeOfLoad?: string;
    paymentType?: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
