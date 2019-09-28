import { CismartApprover } from '../../approvers-and-controllers/models/cismart-approver';

export class AFPPayment {

  amount: number;
  approvers: number[];
  controllers: number[];
  cismartApprovers: CismartApprover[];
  currency: string;
  operationTypeId: number;
  sourceAccount: string;
  sourceAccountId: number;
  tokenName: string;
  tokenCode: string;
  sendVouchers: string;

  serviceInformation: PaymentAFP;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
export class PaymentAFP {
  nameAFP: string;
  periodAFP: string;
  spreadsheetsAFP: string;
  documentNumber: string;
  documentType: string;
  deatilAFPsDto: DetailAFPDto[];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class DetailAFPDto {
  expirationDate: string;
  amounts: number;
  typeContribution: string;
  accountNumberAFP: Number;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
