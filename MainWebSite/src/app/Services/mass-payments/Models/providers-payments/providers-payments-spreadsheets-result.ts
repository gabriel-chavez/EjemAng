export class ProvidersPaymentsSpreadsheetsResult {
    line: number;
    amount: number;
    accountNumber: string;
    gloss: string;
    documentType: any;
    documentNumber: string;
    documentExtension: string;
    titular: string;
    firstDetail: string;
    secondDetail: string;
    sendEmail: boolean;
    Email: string;
    operationDebitHost: string;
    operationMDPMId: string;
    telephoneNumber: string;
    operationStatusId: number;
    description: string;
    idcComplement: string;
    isEdit = false;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
