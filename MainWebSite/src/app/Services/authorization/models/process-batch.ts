export class ProcessBatch {
  batchIds: number[];
  operation: number;
  rejectionCause?: string;
  password?: string;
  tokenName?: string;
  tokenCode?: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
