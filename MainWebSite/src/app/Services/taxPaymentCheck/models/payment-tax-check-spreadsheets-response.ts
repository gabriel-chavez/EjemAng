export class PaymentTaxCheckSpreadsheetsResponse {
    code: number;
    line: number;
    amount: number;
    socialReason: string;
    numberTransact: string;
    typeDocument: string;
    document: string;
    extensionDocument?: string;
    addressDelivery: string;
    email: string;
    isEdit?: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
