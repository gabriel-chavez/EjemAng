import { PaymentTaxCheckSpreadsheetsResponse } from './payment-tax-check-spreadsheets-response';
import { ProcessBatchDto } from '../../shared/models/process-batch';

export class PaymentTaxCheckData extends ProcessBatchDto {
    sourceAccountNumber: string;
    processBatchId: number;
    statusOperation: string;
    typeOperation: string;
    dateProcess: Date;
    // operationTypeId: number;
    // isFutureDate: boolean;
    // isTicket: boolean;
    // isMultipleDebit: boolean;
    // operationStatusId: number;
    // futureDate: string;
    // processDate: string;
    // purchaseExchangeRate: number;
    // saleExchangeRate: number;
    // description: string;
    // currency: string;
    // amount: number;
    // sourceAccountNumber: string;
    // sourceAccountId: number;
    // ticket: number;
    // operationNumberDebitHost: string;
    // preferentialExchange: number;
    // indicatorBuyOrSale: string;
    speeadsheet: PaymentTaxCheckSpreadsheetsResponse[] = [];
    // sendVouchers: string[];
    // approvers: string[];
    // controllers: string[];
    // SourceAccount : string;
    // MessageProcess : string;
    // constructor(values: Object = {}) {
    //   Object.assign(this, values);
    // }
}
