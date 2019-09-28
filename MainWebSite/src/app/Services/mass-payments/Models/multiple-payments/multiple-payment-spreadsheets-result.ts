export class MultiplePaymentSpreadsheetsResult {
    multiplePaymentId: number;
    paymentType: string;
    line: number;
    accountNumber: string;
    titularName: string;
    firstLastName: string;
    secondLastName: string;
    description: string;
    glossPayment: string;
    amount: number;
    accountType: string;
    documentType: any;
    documentNumber: string;
    documentExtension: string;
    branchOfficeId: number;
    firstDetail: string;
    secondDetail: string;
    mail: string;
    instruccionsPayment: string;
    bankId: string;
    commission: number;
    commissionCurrency: string;
    telephoneNumber: string;
    isEdit?: boolean;
    isFail?: boolean;
    isDelete?: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
