export class PaymentAchSpreadsheetResult {
  description?: string;
  line: number;
  targetAccount: string;
  amount: number;
  beneficiary: string;
  operationStatusId?: number;
  mail: string;
  banksAchCode: string;
  branchOfficeId: number;
  details: string;
  isChecked?: boolean;
  typeOfLoad?: string;
  isDeleted?: boolean;
  isEdit?: boolean;
  branchOfficeDescription: string;
  banksName: string;

  constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}



