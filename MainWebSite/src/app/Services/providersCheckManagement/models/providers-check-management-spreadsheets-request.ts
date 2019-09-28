export class ProvidersCheckManagementSpreadsheetsRequest {
    id: number;
    typeOfLoad?: string;
    paymentType?: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
