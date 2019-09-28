export class BatchDetail {
  id: number;
  beneficiary: string;
  operationType: string;
  operationTypeId: number;
  account: string;
  amount: number;
  currency: string;
  creationDate: Date;
  isOperationScheduled: boolean;
  OperationScheduledDate: Date;
  accountId: number;
  isAuthorizerControl: boolean;
  isSelected: boolean;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
