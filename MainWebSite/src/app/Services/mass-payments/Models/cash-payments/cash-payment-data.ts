import { CashPaymentsSpreadsheetsResult } from './cash-payments-spreadsheets-result';
import { ProcessBatchDto } from '../../../shared/models/process-batch';

export class CashPaymentData extends ProcessBatchDto {
  processBatchId: number;
  statusOperation: string;
  typeOperation: string;
  dateProcess: Date;
  speeadsheet: CashPaymentsSpreadsheetsResult[] = [];
}
