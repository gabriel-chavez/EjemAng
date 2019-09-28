export class PaymentAfpDetailResult {
    processBatchId: number;
    sourceAccount: string;
    amount: number;
    currency: string;
    serviceType: string;
    afp: string;
    concept: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
