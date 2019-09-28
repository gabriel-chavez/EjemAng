import { ProcessBatchDto } from '../../shared/models/process-batch';

export class QuotaPaymentDto extends ProcessBatchDto {
    accountId: number;
    expirationDate: Date;
    tokenCode: string;
    tokenName: string;
    sendVouchers: string;
}
