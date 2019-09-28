export class AccountInfoResponse {
  documentType: string;
  documentNumber: string;
  documentExtension: string;
  documentComplement: string;
  client: string;
  cic: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
