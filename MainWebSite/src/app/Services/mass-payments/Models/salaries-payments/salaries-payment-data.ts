import { SalariesPaymentsSpreadsheetsResult } from './salaries-payments-spreadsheets-result';
import { ProcessBatchDto } from '../../../shared/models/process-batch';

export class SalariesPaymentData extends ProcessBatchDto {
  processBatchId: number;
  paymentType: string;
  speeadsheet: SalariesPaymentsSpreadsheetsResult[] = [];
}
