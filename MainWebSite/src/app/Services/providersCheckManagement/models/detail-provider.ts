export class DetailProvider {
    // ProcessBatchId: number;
    Amount: number;
    BeneficiaryReason: string;
    Instructions: string;
    PlaceDelivery: string;
    Detail: string;
    EmailProvider: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
