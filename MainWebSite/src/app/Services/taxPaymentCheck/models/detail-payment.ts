export class DetailPayment {
    // ProcessBatchId: number;
    Line: number;
    Amount: number;
    SocialReason: string;
    NumberTransact: string;
    TypeDocument: string;
    Document: string;
    ExtensionDocument?: string;
    AddressDelivery: string;
    Email: string;
    // MessageProcess : string;
    // UserBackoffice : string;
    // DateProcessBackoffice: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}