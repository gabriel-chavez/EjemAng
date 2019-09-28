export class TrackTransfersDto {
  InitialDate?: Date;
  EndDate?: Date;
  OperationStatusId: number;
  OperationTypeId: number;
  Beneficiary: string;
  ReportType: string;
  CompanyName: string;
  CompanyId: number;
  OrderByAsc: boolean;
  constructor(values: Object = {}) {
     Object.assign(this, values);
  }
}
