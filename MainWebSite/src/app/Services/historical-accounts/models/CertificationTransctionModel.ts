export class CertificationTransction {
  processBatchId: number;
  operationStatusId: string;
  amount: number;
  currency: string;
  operationNumber: number;
  gloss: string;
  user: string;
  dateMovement: string;
  hourMovement: string;
  accountsFormatted: string;
  typeCertificate: string;
  addressShipping: string;
  reasonRejection: string;
  dateModification: Date;
  routeSarc: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
