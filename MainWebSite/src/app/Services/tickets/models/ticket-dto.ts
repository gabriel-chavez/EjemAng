export class TicketDto {
    amount: number;
    sourceCurrency: string;
    destinationCurrency: string;
    number?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
