import { PaymentAchSpreadsheetResult } from './payment-ach-spreadsheet-result';
import { ProcessBatchDto } from '../../../shared/models/process-batch';

export class PaymentAchData extends ProcessBatchDto {
  processBatchId: number;
  statusOperation: string;
  typeOperation: string;
  dateProcess: Date;
  spreadsheet: PaymentAchSpreadsheetResult[] = [];
}
