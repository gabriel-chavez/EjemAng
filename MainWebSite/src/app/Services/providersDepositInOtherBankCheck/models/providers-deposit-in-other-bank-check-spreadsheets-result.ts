export class ProvidersDepositInOtherBankCheckSpreadsheetsResult {
    code: number;
    destinationAccount: string;
    amount: number;
    beneficiaryReason: string;
    instructions: string;
    detail: string;
    bank: string;
    emailProvider: string;
    isEdit?: boolean;
    type?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
