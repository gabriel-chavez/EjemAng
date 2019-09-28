import { ProvidersPaymentsSpreadsheetsResult } from './providers-payments-spreadsheets-result';
import { ProcessBatchDto } from '../../../shared/models/process-batch';

export class ProvidersPaymentData extends ProcessBatchDto {
  processBatchId: number;
  paymentType: string;
  speeadsheet: ProvidersPaymentsSpreadsheetsResult[] = [];
}
