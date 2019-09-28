import { CismartApprover } from '../../approvers-and-controllers/models/cismart-approver';

export class ProcessBatchDto {
    id: number;
    operationTypeId: number;
    sourceAccountId: number;
    sourceAccount: string;
    amount: number;
    sourceCurrency: string;
    currency: string;
    description: string;
    isScheduledProcess: boolean;
    scheduledProcess: Date;
    isMultipleDebits: boolean;
    operationNumberDebitHost: string;
    isTicket: boolean;
    numberTicket?: number;
    preferentialExchange: number;
    indicatorBuyOrSale: string;
    fundSource: string;
    fundDestination: string;
    sendVouchers: string;
    approvers: number[];
    controllers: number[];
    cismartApprovers: CismartApprover[];
    tokenCode: string;
    tokenName: string;
}
