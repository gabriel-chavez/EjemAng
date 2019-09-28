export class PaymentOddAchSpreadsheetResult {
  operationStatusId?: number;
  description?: string;
  line: number;
  targetAccount: string;
  amount: number;
  typeIdc: any;
  idc: string;
  extensionIdc: string;
  destinationBranchOfficeId: number;
  serviceCode: string;
  mail: string;
  banksAchCode: string;
  flagFutureDate: boolean;
  futureDate: Date;
  glossDeposit?: string;
  isChecked?: boolean;
  typeOfLoad?: string;
  isDeleted?: boolean;
  isEdit?: boolean;
  businessName: string;
  branchOfficeDescription: string;
  banksName: string;
  documentType: string;
  documentExtension: string;

  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}



