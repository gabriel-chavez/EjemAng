import { MultiplePaymentsDetailsForms } from './multiple-payments-details-forms';
import { ProcessBatchDto } from '../../../shared/models/process-batch';

export class MultiplePaymentsData extends ProcessBatchDto {
    processBatchId: number;
    typeOperation: string;
    accountCurrency: string;
    speeadsheet: MultiplePaymentsDetailsForms =  new MultiplePaymentsDetailsForms();
}
