export class InformationPaymentTaxCheckResponseModel {
    Line: number;
    Amount: number;
    SocialReason: string;
    NumberTransact: string;
    TypeDocument: string;
    Document: string;
    ExtensionDocument?: string;
    AddressDelivery: string;
    Email: string;
    // SourceAccount? : string;
    // MessageProcess : string;
}
