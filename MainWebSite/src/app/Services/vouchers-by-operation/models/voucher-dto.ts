export class VoucherDto {
  InitialDate: Date;
  EndDate: Date;
  OperationId: string;
  BatchId: number;
  Provider: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
