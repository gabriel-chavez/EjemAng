export class FavoriteTransferResponse {
    sourceAccountId: number;
    destinationAccountNumber: string;
    amount: number;
    currency: string;
    name: string;
    id: number;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
