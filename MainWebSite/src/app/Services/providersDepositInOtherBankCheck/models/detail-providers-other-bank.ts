export class DetailProvidersOtherBank {
    DestinationAccount: string;
    Amount: number;
    BeneficiaryReason: string;
    Instructions: string;
    Detail: string;
    Bank: string;
    EmailProvider: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
