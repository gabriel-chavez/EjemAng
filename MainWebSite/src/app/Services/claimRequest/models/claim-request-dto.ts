import { ClaimRequestSpreadsheetsResult } from './claim-request-spreadsheets-result';
import { ProcessBatchDto } from '../../shared/models/process-batch';

export class ClaimRequestDto extends ProcessBatchDto {
    department: string;
    address: string;
    phone: string;
    cellPhone: string;
    phones: string;
    cellPhones: string;
    fax: string;
    email: string;
    emails: string;
    number: number;
    productName: string;
    accountNumber: string;
    cardNumber: string;
    serviceName: string;
    transactionDate?: Date;
    transactionTime?: string;
    description: string;
    accountId: number;
    claimType: string;
    sourceAccount: string;
    serviceId: string;
    userId: number;
    messageProcess: string;
    state: string;
    numberCaseSarc: string;
    branchOffice: string;
    agency: string;
    reasonRejection: string;
    routeSarc: string;
}
