export class ProvidersCheckManagementResponse {
    Amount: number;
    BeneficiaryReason: string;
    Instructions: string;
    PlaceDelivery: string;
    Detail: string;
    EmailProvider: string;
    MessageProcess?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
