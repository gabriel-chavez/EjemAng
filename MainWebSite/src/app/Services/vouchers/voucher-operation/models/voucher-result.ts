export class VoucherResult {
    id: number;
    userCreationId: number;
    operationTypeId: number;
    sourceAccount: string;
    formattedAccount: string;
    amount: number;
    currency: string;
    dateCreation: Date;
    nameOperation: string;
    statusCode: string;
    state: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
