export class PaymentTaxCheckResponse {
    line: number;
    amount: number;
    socialReason: string;
    numberTransact: string;
    typeDocument: string;
    document: string;
    extensionDocument?: string;
    addressDelivery: string;
    email: string;
    // isEdit?: boolean;
    // SourceAccount? : string;
    MessageProcess?: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
