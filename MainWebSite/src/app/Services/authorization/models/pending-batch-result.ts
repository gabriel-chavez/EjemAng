import { BatchDetail } from './batch-detail';

export class PendingBatchResult {
  batchesToControl: BatchDetail[];
  batchesToAuthorize: BatchDetail[];
}
