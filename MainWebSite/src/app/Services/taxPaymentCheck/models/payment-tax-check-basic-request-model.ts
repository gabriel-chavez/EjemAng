export class PaymentTaxCheckBasicRequestModel {
    Line: number;
    Amount: number;
    SocialReason: string;
    NumberTransact: string;
    TypeDocument: string;
    Document: string;
    ExtensionDocument?: string;
    AddressDelivery: string;
    Email: string;
    MessageProcess?: string;
    // UserBackoffice : string;
    // DateProcessBackoffice: string;
}
