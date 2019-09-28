export class ProvidersDepositInOtherBankCheckBasicDto {
    DestinationAccount: string;
    Amount: number;
    BeneficiaryReason: string;
    Instructions: string;
    Detail: string;
    Bank: string;
    EmailProvider: string;
    MessageProcess?: string;
}
