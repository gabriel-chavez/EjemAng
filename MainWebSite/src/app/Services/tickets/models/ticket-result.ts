export class TicketResult {
    application: string;
    responseCode: number;
    state: string;
    convertedAmount: number;
    originalAmount: number;
    currency: string;
    responseMessage: string;
    ticket: number = null;
    exchangeRate: number;
    operationType: string;
}
