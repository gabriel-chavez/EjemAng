import { ProvidersCheckManagementSpreadsheetsResponse} from './providers-check-management-spreadsheets-response';
import { ProcessBatchDto } from '../../shared/models/process-batch';

export class ProvidersCheckManagementData extends ProcessBatchDto {
    processBatchId: number;
    statusOperation: string;
    typeOperation: string;
    dateProcess: Date;
    speeadsheet: ProvidersCheckManagementSpreadsheetsResponse[] = [];

}
