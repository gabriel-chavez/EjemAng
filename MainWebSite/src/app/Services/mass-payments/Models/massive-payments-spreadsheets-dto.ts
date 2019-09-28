export class MassivePaymentsSpreadsheetsDto {
    id: number;
    paymentType?: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
