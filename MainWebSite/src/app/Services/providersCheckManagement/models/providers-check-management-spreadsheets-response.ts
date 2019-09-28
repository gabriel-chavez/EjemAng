export class ProvidersCheckManagementSpreadsheetsResponse {
    code: number;
    amount: number;
    beneficiaryReason: string;
    instructions: string;
    placeDelivery: string;
    detail: string;
    emailProvider: string;
    // MessageProcess: string;
    isEdit?: boolean;
    type?: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
